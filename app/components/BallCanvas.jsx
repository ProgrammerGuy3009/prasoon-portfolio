"use client";

import { useEffect, useRef, useState } from "react";
import { database, auth, initializeAuth } from "@/lib/firebase";
import { ref, onValue, set, update } from "firebase/database";
import { Ball, updateAllBalls, drawBalls } from "@/lib/ballPhysics";

const BALL_COLORS = ["#FF4444", "#FF6B35", "#FF7F50", "#E85D5D", "#C41E3A", "#FF8C42"];

export default function BallCanvas({ isDarkMode }) {
  const canvasRef = useRef(null);
  const [balls, setBalls] = useState([]);
  const [userId, setUserId] = useState(null);
  const [draggingBall, setDraggingBall] = useState(null);
  const [dragStart, setDragStart] = useState(null);
  const animationFrameRef = useRef(null);

  // Initialize Firebase auth and get user ID
  useEffect(() => {
    const initAuth = async () => {
      const uid = await initializeAuth();
      setUserId(uid);
    };
    initAuth();
  }, []);

  // Set up Firebase listeners
  useEffect(() => {
    if (!userId) return;

    const ballsRef = ref(database, "balls");
    const unsubscribe = onValue(ballsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const newBalls = Object.entries(data).map(([id, ballData], index) => {
        const ball = new Ball(
          ballData.x,
          ballData.y,
          ballData.radius || 15,
          ballData.color || BALL_COLORS[index % BALL_COLORS.length],
          id
        );
        ball.vx = ballData.vx || 0;
        ball.vy = ballData.vy || 0;
        return ball;
      });
      setBalls(newBalls);
    });

    return unsubscribe;
  }, [userId]);

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || balls.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    const animate = () => {
      updateAllBalls(balls, width, height);
      drawBalls(ctx, balls, isDarkMode);

      // Sync to Firebase
      balls.forEach((ball) => {
        const ballRef = ref(database, `balls/${ball.userId}`);
        set(ballRef, {
          x: ball.x,
          y: ball.y,
          vx: ball.vx,
          vy: ball.vy,
          radius: ball.radius,
          color: ball.color,
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [balls, isDarkMode, userId]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mouse drag interaction
  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (let ball of balls) {
      const dx = ball.x - x;
      const dy = ball.y - y;
      if (Math.sqrt(dx * dx + dy * dy) < ball.radius) {
        setDraggingBall(ball);
        setDragStart({ x: e.clientX, y: e.clientY });
        break;
      }
    }
  };

  const handleMouseMove = (e) => {
    if (!draggingBall) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    draggingBall.x = x;
    draggingBall.y = y;
  };

  const handleMouseUp = (e) => {
    if (!draggingBall || !dragStart) return;

    const vx = (e.clientX - dragStart.x) * 0.5;
    const vy = (e.clientY - dragStart.y) * 0.5;

    draggingBall.vx = vx;
    draggingBall.vy = vy;

    setDraggingBall(null);
    setDragStart(null);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-auto"
      style={{ cursor: draggingBall ? "grabbing" : "grab" }}
    />
  );
}
