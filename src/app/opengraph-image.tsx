import { ImageResponse } from "next/og";
import { PROJECTS } from "@/data/projects";

export const runtime = "edge";
export const alt = "PhD Solutions — Filippos Dimitrios Ktistakis";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social-share card for 6x7.gr (Twitter/LinkedIn/Slack link previews).
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#07070a",
          color: "#ededed",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: -3,
          }}
        >
          PhD Solutions
        </div>
        <div style={{ display: "flex", fontSize: 40, marginTop: 16 }}>
          <span style={{ color: "#c7f25b" }}>Ph</span>
          <span>ilippos&nbsp;</span>
          <span style={{ color: "#c7f25b" }}>D</span>
          <span>imitrios Ktistakis</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            marginTop: 40,
            color: "#8a8a93",
            maxWidth: 900,
          }}
        >
          MSc Computational Physics. End-to-end problem solving: idea →
          workflow → shipped product.
        </div>
        <div style={{ display: "flex", marginTop: 48, alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "#07070a",
              background: "#c7f25b",
              padding: "10px 28px",
              borderRadius: 999,
              fontWeight: 600,
            }}
          >
            {PROJECTS.length}&nbsp;apps at 6x7.gr
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
