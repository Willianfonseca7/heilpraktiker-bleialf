import { Box, Typography } from "@mui/material";

const animationRootSx = {
  position: "relative",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: { xs: 320, sm: 380, lg: 460 },
  px: { xs: 1, sm: 2, md: 0 },
  "@keyframes irisRotateClockwise": {
    "0%": { transform: "translate(-50%, -50%) rotate(0deg)" },
    "100%": { transform: "translate(-50%, -50%) rotate(360deg)" },
  },
  "@keyframes irisRotateCounterClockwise": {
    "0%": { transform: "translate(-50%, -50%) rotate(360deg)" },
    "100%": { transform: "translate(-50%, -50%) rotate(0deg)" },
  },
  "@keyframes irisPulse": {
    "0%, 100%": {
      transform: "translate(-50%, -50%) scale(1)",
      opacity: 0.9,
    },
    "50%": {
      transform: "translate(-50%, -50%) scale(1.12)",
      opacity: 1,
    },
  },
  "@keyframes irisBreathing": {
    "0%, 100%": { opacity: 0.64 },
    "50%": { opacity: 0.98 },
  },
  "@keyframes irisFloat": {
    "0%, 100%": { transform: "translateY(0px)" },
    "50%": { transform: "translateY(-10px)" },
  },
} as const;

const shellSx = {
  position: "relative",
  width: { xs: 248, sm: 300, md: 340, lg: 392 },
  height: { xs: 248, sm: 300, md: 340, lg: 392 },
  borderRadius: "50%",
  background:
    "radial-gradient(circle at center, rgba(220,252,231,0.96) 0%, rgba(187,247,208,0.82) 24%, rgba(110,231,183,0.26) 52%, rgba(255,255,255,0.94) 76%, rgba(236,253,245,0.78) 100%)",
  border: "1px solid rgba(5,150,105,0.12)",
  boxShadow:
    "0 18px 42px rgba(15,23,42,0.07), inset 0 0 0 1px rgba(255,255,255,0.36)",
  overflow: "visible",
} as const;

const haloSx = {
  position: "absolute",
  inset: { xs: -18, md: -28 },
  borderRadius: "50%",
  background:
    "radial-gradient(circle, rgba(16,185,129,0.09) 0%, rgba(16,185,129,0.05) 42%, rgba(255,255,255,0) 72%)",
  filter: "blur(14px)",
  animation: "irisBreathing 9s ease-in-out infinite",
} as const;

const centerBaseSx = {
  position: "absolute",
  top: "50%",
  left: "50%",
  borderRadius: "50%",
  transform: "translate(-50%, -50%)",
} as const;

type RingProps = {
  size: { xs: number; sm: number; md: number; lg: number };
  borderColor: string;
  background?: string;
  animation?: string;
  opacity?: number;
  blur?: string;
};

function IrisRing({
  size,
  borderColor,
  background,
  animation,
  opacity = 1,
  blur = "0px",
}: RingProps) {
  return (
    <Box
      sx={{
        ...centerBaseSx,
        width: size,
        height: size,
        border: `1px solid ${borderColor}`,
        background,
        opacity,
        filter: `blur(${blur})`,
        animation,
      }}
    />
  );
}

function IrisTickMarks() {
  return (
    <>
      {Array.from({ length: 18 }).map((_, index) => {
        const rotation = index * 20;

        return (
          <Box
            key={rotation}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: { xs: 2, md: 2.5 },
              height: { xs: 10, md: 14 },
              borderRadius: "999px",
              bgcolor: "rgba(5,150,105,0.22)",
              transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              transformOrigin: "center 124px",
              boxShadow: "0 0 6px rgba(16,185,129,0.06)",
            }}
          />
        );
      })}
    </>
  );
}

function IrisRadialLines() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => {
        const rotation = 12 + index * 45;

        return (
          <Box
            key={rotation}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: { xs: 1, md: 1.5 },
              height: { xs: 90, sm: 110, md: 126, lg: 144 },
              borderRadius: "999px",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.12) 16%, rgba(16,185,129,0.16) 52%, rgba(255,255,255,0) 100%)",
              opacity: 0.42,
              transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              transformOrigin: "center center",
              filter: "blur(0.2px)",
            }}
          />
        );
      })}
    </>
  );
}

function IrisSignalDots() {
  const dots = [
    { top: "26%", left: "61%", size: { xs: 8, md: 10 } },
    { top: "63%", left: "31%", size: { xs: 7, md: 9 } },
    { top: "69%", left: "66%", size: { xs: 6, md: 8 } },
  ];

  return (
    <>
      {dots.map((dot, index) => (
        <Box
          key={`${dot.top}-${dot.left}-${index}`}
          sx={{
            position: "absolute",
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.84)",
            boxShadow:
              "0 0 0 4px rgba(16,185,129,0.09), 0 0 14px rgba(16,185,129,0.18)",
            animation: "irisBreathing 4.6s ease-in-out infinite",
            animationDelay: `${index * 0.8}s`,
          }}
        />
      ))}
    </>
  );
}

function IrisTechnicalArcs() {
  const arcs = [
    {
      size: { xs: 212, sm: 260, md: 294, lg: 340 },
      borderColor: "rgba(5,150,105,0.22)",
      clipPath: "polygon(10% 0%, 88% 0%, 88% 26%, 10% 26%)",
      animation: "irisRotateClockwise 20s linear infinite",
    },
    {
      size: { xs: 164, sm: 206, md: 232, lg: 270 },
      borderColor: "rgba(15,118,110,0.18)",
      clipPath: "polygon(18% 74%, 90% 74%, 90% 100%, 18% 100%)",
      animation: "irisRotateCounterClockwise 23s linear infinite",
    },
  ] as const;

  return (
    <>
      {arcs.map((arc, index) => (
        <Box
          key={index}
          sx={{
            ...centerBaseSx,
            width: arc.size,
            height: arc.size,
            borderRadius: "50%",
            border: `1px solid ${arc.borderColor}`,
            clipPath: arc.clipPath,
            opacity: 0.9,
            animation: arc.animation,
          }}
        />
      ))}
    </>
  );
}

export default function IrisAnimation() {
  return (
    <Box sx={animationRootSx}>
      <Box sx={shellSx}>
        <Box sx={haloSx} />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            animation: "irisRotateClockwise 28s linear infinite",
          }}
        >
          <IrisTickMarks />
        </Box>

        <IrisRing
          size={{ xs: 216, sm: 264, md: 300, lg: 346 }}
          borderColor="rgba(5,150,105,0.22)"
          background="radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(16,185,129,0.08) 68%, rgba(5,150,105,0.16) 100%)"
          animation="irisRotateClockwise 18s linear infinite"
        />

        <IrisRing
          size={{ xs: 168, sm: 208, md: 238, lg: 278 }}
          borderColor="rgba(15,118,110,0.18)"
          background="radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(16,185,129,0.10) 58%, rgba(16,185,129,0.18) 100%)"
          animation="irisRotateCounterClockwise 24s linear infinite"
          opacity={0.9}
        />

        <IrisRing
          size={{ xs: 114, sm: 142, md: 164, lg: 188 }}
          borderColor="rgba(4,120,87,0.24)"
          background="radial-gradient(circle, rgba(209,250,229,0.96) 0%, rgba(110,231,183,0.45) 48%, rgba(4,120,87,0.20) 100%)"
          animation="irisBreathing 7s ease-in-out infinite"
        />

        <IrisTechnicalArcs />
        <IrisRadialLines />
        <IrisSignalDots />

        <Box
          sx={{
            ...centerBaseSx,
            width: { xs: 68, sm: 82, md: 94, lg: 106 },
            height: { xs: 68, sm: 82, md: 94, lg: 106 },
            background:
              "radial-gradient(circle at 42% 38%, rgba(255,255,255,0.22) 0%, rgba(22,101,52,0.95) 42%, rgba(6,78,59,1) 100%)",
            boxShadow:
              "0 0 20px rgba(16,185,129,0.18), inset 0 0 0 1px rgba(255,255,255,0.14)",
            animation: "irisPulse 4.8s ease-in-out infinite",
          }}
        />

        <Box
          sx={{
            ...centerBaseSx,
            width: { xs: 20, sm: 24, md: 28, lg: 32 },
            height: { xs: 20, sm: 24, md: 28, lg: 32 },
            background:
              "radial-gradient(circle, rgba(17,24,39,0.96) 0%, rgba(2,6,23,1) 100%)",
            boxShadow: "0 0 20px rgba(15,23,42,0.28)",
          }}
        />

        <Box
          sx={{
            ...centerBaseSx,
            width: { xs: 10, sm: 12, md: 14, lg: 16 },
            height: { xs: 10, sm: 12, md: 14, lg: 16 },
            top: { xs: "42%", sm: "41%", md: "40%" },
            left: { xs: "44%", sm: "43%", md: "43%" },
            background: "rgba(255,255,255,0.74)",
            filter: "blur(1px)",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: { xs: "20%", sm: "18%", lg: "17%" },
            left: { xs: "12%", sm: "10%", lg: "10%" },
            borderRadius: "999px",
            border: "1px solid rgba(5,150,105,0.12)",
            bgcolor: "rgba(255,255,255,0.88)",
            px: 1.5,
            py: 0.65,
            boxShadow: "0 8px 18px rgba(15,23,42,0.05)",
            animation: "irisFloat 4.6s ease-in-out infinite",
          }}
        >
          <Typography
            sx={{
              fontSize: "0.66rem",
              fontWeight: 700,
              color: "rgba(6,95,70,0.88)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Analysepunkt
          </Typography>
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: { xs: "64%", sm: "66%", lg: "67%" },
            left: { xs: "12%", sm: "9%", lg: "8%" },
            borderRadius: "999px",
            border: "1px solid rgba(15,23,42,0.08)",
            bgcolor: "rgba(255,255,255,0.88)",
            px: 1.5,
            py: 0.65,
            boxShadow: "0 8px 18px rgba(15,23,42,0.05)",
            animation: "irisFloat 5.2s ease-in-out infinite",
          }}
        >
          <Typography
            sx={{
              fontSize: "0.64rem",
              fontWeight: 700,
              color: "rgba(6,95,70,0.82)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Mapping
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          position: "absolute",
          right: { xs: "50%", sm: "17%", lg: "11%" },
          bottom: { xs: 20, sm: 30, lg: 48 },
          transform: { xs: "translateX(50%)", sm: "none" },
          borderRadius: "999px",
          border: "1px solid rgba(15,23,42,0.08)",
          bgcolor: "rgba(255,255,255,0.94)",
          px: 2.2,
          py: 0.95,
          boxShadow: "0 14px 28px rgba(15,23,42,0.07)",
          animation: "irisFloat 3.8s ease-in-out infinite",
          backdropFilter: "blur(10px)",
        }}
        >
          <Typography
            sx={{
              fontSize: "0.78rem",
            fontWeight: 700,
            color: "primary.dark",
            letterSpacing: "0.02em",
          }}
        >
          Iridologie Analyse
        </Typography>
      </Box>
    </Box>
  );
}
