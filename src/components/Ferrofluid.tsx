"use client";

import { useEffect, useRef, useCallback } from "react";

interface FerrofluidProps {
  colors?: string[];
  speed?: number;
  scale?: number;
  turbulence?: number;
  fluidity?: number;
  rimWidth?: number;
  sharpness?: number;
  shimmer?: number;
  glow?: number;
  flowDirection?: "up" | "down" | "left" | "right";
  opacity?: number;
  mouseInteraction?: boolean;
  mouseStrength?: number;
  mouseRadius?: number;
}

const VERTEX_SHADER = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_speed;
  uniform float u_scale;
  uniform float u_turbulence;
  uniform float u_fluidity;
  uniform float u_rimWidth;
  uniform float u_sharpness;
  uniform float u_shimmer;
  uniform float u_glow;
  uniform float u_opacity;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;

  // Simplex-like noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
      + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 5; i++) {
      value += amplitude * snoise(p * frequency);
      frequency *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  // Metaball function
  float metaball(vec2 p, vec2 center, float radius) {
    vec2 d = p - center;
    return radius / dot(d, d);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec2 p = (gl_FragCoord.xy - u_resolution * 0.5) / min(u_resolution.x, u_resolution.y);

    float t = u_time * u_speed;

    // Flow direction offset
    vec2 flowOffset = vec2(0.0);
    // Flow is handled via time offset in noise

    // Generate metaball positions that move organically
    float totalField = 0.0;

    // Large slow-moving blobs
    for (int i = 0; i < 4; i++) {
      float fi = float(i);
      vec2 center = vec2(
        sin(t * 0.3 + fi * 1.7) * 0.8 + cos(t * 0.2 + fi * 0.9) * 0.3,
        cos(t * 0.25 + fi * 2.1) * 0.6 + sin(t * 0.15 + fi * 1.3) * 0.4
      );
      float radius = 0.08 + sin(t * 0.4 + fi) * 0.02;
      totalField += metaball(p * u_scale, center, radius);
    }

    // Medium blobs
    for (int i = 0; i < 6; i++) {
      float fi = float(i);
      vec2 center = vec2(
        cos(t * 0.4 + fi * 1.1) * 1.0 + sin(t * 0.3 + fi * 0.7) * 0.5,
        sin(t * 0.35 + fi * 1.5) * 0.8 + cos(t * 0.2 + fi * 1.9) * 0.3
      );
      float radius = 0.04 + sin(t * 0.5 + fi * 1.3) * 0.01;
      totalField += metaball(p * u_scale, center, radius);
    }

    // Small detail blobs
    for (int i = 0; i < 8; i++) {
      float fi = float(i);
      vec2 center = vec2(
        sin(t * 0.6 + fi * 0.9) * 1.3 + cos(t * 0.45 + fi * 1.4) * 0.6,
        cos(t * 0.5 + fi * 1.2) * 1.0 + sin(t * 0.35 + fi * 0.8) * 0.5
      );
      float radius = 0.02 + sin(t * 0.7 + fi * 2.0) * 0.005;
      totalField += metaball(p * u_scale, center, radius);
    }

    // Noise-based distortion for organic feel
    float noise1 = fbm(p * u_turbulence * 2.0 + t * 0.1);
    float noise2 = fbm(p * u_turbulence * 3.0 - t * 0.15 + 100.0);
    totalField += noise1 * 0.3;

    // Mouse interaction
    vec2 mouseNorm = u_mouse / u_resolution;
    mouseNorm.y = 1.0 - mouseNorm.y;
    vec2 mousePos = (mouseNorm - 0.5) * 2.0;
    mousePos.x *= u_resolution.x / u_resolution.y;
    float mouseDist = length(p - mousePos);
    float mouseField = 0.15 / (mouseDist * mouseDist + 0.05);
    totalField += mouseField;

    // Threshold and edge detection for ferrofluid look
    float threshold = 1.0;
    float edge = smoothstep(threshold - u_rimWidth, threshold, totalField);
    float core = smoothstep(threshold, threshold + u_sharpness * 0.5, totalField);

    // Color mixing based on field intensity
    float colorMix1 = smoothstep(0.0, 2.0, totalField);
    float colorMix2 = smoothstep(1.0, 3.0, totalField);
    vec3 color = mix(u_color1, u_color2, colorMix1);
    color = mix(color, u_color3, colorMix2 * 0.5);

    // Shimmer highlight
    float shimmerNoise = snoise(p * 8.0 + t * 2.0);
    float shimmer = shimmerNoise * 0.5 + 0.5;
    shimmer = pow(shimmer, 3.0) * u_shimmer * core;

    // Glow effect at edges
    float glowEffect = edge * u_glow * 0.3;
    float glowFalloff = smoothstep(0.0, 0.3, edge) * (1.0 - core);
    glowEffect += glowFalloff * u_glow * 0.5;

    // Combine
    float alpha = core * u_opacity;
    alpha = max(alpha, glowEffect * u_opacity * 0.5);
    alpha = max(alpha, shimmer * 0.3 * u_opacity);

    // Add subtle noise to break up banding
    float dither = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.02;
    alpha += dither;

    gl_FragColor = vec4(color, alpha);
  }
`;

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 1, 1];
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ];
}

export default function Ferrofluid({
  colors = ["#ffffff", "#ffffff", "#ffffff"],
  speed = 0.5,
  scale = 1.6,
  turbulence = 1,
  fluidity = 0.1,
  rimWidth = 0.2,
  sharpness = 2.5,
  shimmer = 1.5,
  glow = 2,
  flowDirection = "down",
  opacity = 1,
  mouseInteraction = true,
  mouseStrength = 1,
  mouseRadius = 0.35,
}: FerrofluidProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const uniformsRef = useRef<Record<string, WebGLUniformLocation>>({});
  const mouseRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const isLowPower = useRef(false);

  const createShader = useCallback(
    (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Detect low-power devices
    isLowPower.current =
      navigator.hardwareConcurrency !== undefined &&
      navigator.hardwareConcurrency <= 4;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
      powerPreference: isLowPower.current ? "low-power" : "high-performance",
    });

    if (!gl) {
      console.warn("WebGL not supported, falling back");
      return;
    }

    glRef.current = gl;

    // Create shaders
    const vertShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    programRef.current = program;
    gl.useProgram(program);

    // Full-screen quad
    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posAttr = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    const uniformNames = [
      "u_resolution",
      "u_time",
      "u_mouse",
      "u_speed",
      "u_scale",
      "u_turbulence",
      "u_fluidity",
      "u_rimWidth",
      "u_sharpness",
      "u_shimmer",
      "u_glow",
      "u_opacity",
      "u_color1",
      "u_color2",
      "u_color3",
    ];

    const uniforms: Record<string, WebGLUniformLocation> = {};
    for (const name of uniformNames) {
      const loc = gl.getUniformLocation(program, name);
      if (loc) uniforms[name] = loc;
    }
    uniformsRef.current = uniforms;

    // Enable blending
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    startTimeRef.current = performance.now();

    const resize = () => {
      const dpr = isLowPower.current ? 1 : Math.min(window.devicePixelRatio, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    // Animation loop
    const render = () => {
      if (!gl || !programRef.current) return;

      const elapsed = (performance.now() - startTimeRef.current) / 1000;

      // On low-power, run at half frame rate
      if (isLowPower.current && Math.floor(elapsed * 30) % 2 !== 0) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      const u = uniformsRef.current;
      const [r1, g1, b1] = hexToRgb(colors[0]);
      const [r2, g2, b2] = hexToRgb(colors[1]);
      const [r3, g3, b3] = hexToRgb(colors[2]);

      gl.uniform2f(u.u_resolution, canvas.width, canvas.height);
      gl.uniform1f(u.u_time, elapsed);
      gl.uniform2f(
        u.u_mouse,
        mouseRef.current.x * (isLowPower.current ? 1 : Math.min(window.devicePixelRatio, 2)),
        mouseRef.current.y * (isLowPower.current ? 1 : Math.min(window.devicePixelRatio, 2))
      );
      gl.uniform1f(u.u_speed, speed);
      gl.uniform1f(u.u_scale, scale);
      gl.uniform1f(u.u_turbulence, turbulence);
      gl.uniform1f(u.u_fluidity, fluidity);
      gl.uniform1f(u.u_rimWidth, rimWidth);
      gl.uniform1f(u.u_sharpness, sharpness);
      gl.uniform1f(u.u_shimmer, shimmer);
      gl.uniform1f(u.u_glow, glow);
      gl.uniform1f(u.u_opacity, opacity);
      gl.uniform3f(u.u_color1, r1, g1, b1);
      gl.uniform3f(u.u_color2, r2, g2, b2);
      gl.uniform3f(u.u_color3, r3, g3, b3);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseInteraction) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    if (mouseInteraction) {
      canvas.addEventListener("mousemove", handleMouseMove);
    }

    // Pause on low visibility
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animFrameRef.current);
      } else {
        startTimeRef.current =
          performance.now() - (performance.now() - startTimeRef.current);
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (mouseInteraction) {
        canvas.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [
    colors,
    speed,
    scale,
    turbulence,
    fluidity,
    rimWidth,
    sharpness,
    shimmer,
    glow,
    opacity,
    mouseInteraction,
    createShader,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: mouseInteraction ? "auto" : "none" }}
    />
  );
}
