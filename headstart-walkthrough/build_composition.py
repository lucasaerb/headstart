import json

groups = json.load(open('assets/captions.json'))
TOTAL = 74.0
BASE_DUR = 71.8

# (id, file, start, dur, title, kind, enter, exit)  enter/exit: 'cut' or 'fade'
CUTS = [
    # (id, file, start, dur, title, kind, enter, exit, crop)
    # 0.0-4.0 stays on the base recording: presenter + the HeadStart page.
    ("c1", "cut2_sf.mp4",         4.00, 3.70, "San Francisco",  "Open world",    "fade", "cut",  "translate(-43%, -68%) scale(1.62)"),
    ("c2", "cut3_city.mp4",       7.70, 3.10, "Fable Cities",   "City builder",  "cut",  "cut",  "translate(-50%, -52%) scale(1.08)"),
    ("c3", "cut4_r3f.mp4",       10.80, 2.90, "Ecctrl Sandbox", "Three.js",      "cut",  "cut",  "translate(-50%, -56%) scale(1.36)"),
    ("c4", "cut5_boating.mp4",   13.70, 2.50, "Copper Water",   "Stylized world","cut",  "cut",  "translate(-50%, -50%) scale(1.14)"),
    ("c5", "cut6_blackwater.mp4",16.20, 2.10, "Blackwater",     "FPS shooter",   "cut",  "fade", "translate(-50%, -62%) scale(1.34)"),
    ("c6", "cut7_shooter.mp4",   52.00, 3.40, "Blackwater",     "Shooter",       "fade", "cut",  "translate(-50%, -62%) scale(1.34)"),
    ("c7", "cut8_driving.mp4",   55.40, 1.80, "Ecctrl Sandbox", "Driving",       "cut",  "cut",  "translate(-50%, -56%) scale(1.36)"),
    ("c8", "cut9_stylized.mp4",  57.20, 4.90, "Copper Water",   "Stylized world","cut",  "fade", "translate(-50%, -50%) scale(1.14)"),
]

cut_html = []
for i, (cid, f, st, du, title, kind, _en, _ex, _crop) in enumerate(CUTS):
    track = 2 + (i % 2)
    cut_html.append(f'''
        <div id="{cid}-wrap" class="cut-wrap" data-layout-allow-overflow>
          <video id="{cid}-v" class="clip" data-start="{st}" data-duration="{du}"
                 data-track-index="{track}" src="assets/{f}" muted playsinline></video>
          <div id="{cid}-chip" class="cut-chip">
            <span class="bar"></span>
            <span class="txt"><b>{title}</b><i>{kind}</i></span>
          </div>
        </div>''')

cap_html = []
for i, g in enumerate(groups):
    cap_html.append(f'        <div class="cap" id="cap-{i}"><span>{g["text"]}</span></div>')

cuts_js = ",\n        ".join(
    f'{{id:"{cid}", start:{st}, dur:{du}, enter:"{en}", exit:"{ex}"}}'
    for (cid, f, st, du, t, k, en, ex, cr) in CUTS)

crop_css = "\n".join(
    f"      #{cid}-v {{ transform: {cr}; }}" for (cid, f, s_, d_, t, k, e_, x_, cr) in CUTS)

caps_js = ",\n        ".join(f'{{s:{g["start"]}, e:{g["end"]}}}' for g in groups)

HTML = f'''<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600..900&family=Space+Grotesk:wght@400;500;600;700&display=swap" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>
      * {{ margin: 0; padding: 0; box-sizing: border-box; }}
      html, body {{
        margin: 0; width: 1920px; height: 1080px; overflow: hidden;
        background: #10162b;
      }}
      body {{ font-family: "Space Grotesk", sans-serif; color: #f6f1e6; }}

      :root {{
        --cream: #f6f1e6; --paper: #fffdf8; --navy: #10162b;
        --slate: #3a4256; --blue: #3b5bff; --terracotta: #e2703a;
      }}

      /* ---------- base screen recording ---------- */
      #base-wrap {{
        position: absolute; inset: 0; overflow: hidden; z-index: 1; background: #10162b;
      }}
      #base-wrap video {{
        position: absolute; top: 50%; left: 50%;
        width: auto; height: auto; min-width: 100%; min-height: 100%;
        transform: translate(-50%, -50%);
      }}
      #dim {{
        position: absolute; inset: 0; z-index: 2; background: #0a0f20; opacity: 0;
        pointer-events: none;
      }}

      /* ---------- b-roll cutaways ---------- */
      .cut-wrap {{
        position: absolute; inset: 0; overflow: hidden;
        background: transparent; z-index: 5; opacity: 0;
      }}
      .cut-wrap video {{
        position: absolute; top: 50%; left: 50%;
        width: auto; height: auto; min-width: 100%; min-height: 100%;
        transform: translate(-50%, -50%);
      }}
{crop_css}

      .cut-chip {{
        position: absolute; left: 84px; top: 76px; z-index: 12;
        display: flex; align-items: stretch; gap: 16px;
        background: rgba(16, 22, 43, 0.86);
        backdrop-filter: blur(6px);
        padding: 14px 26px 14px 20px; border-radius: 10px;
      }}
      .cut-chip .bar {{ width: 5px; border-radius: 3px; background: var(--terracotta); flex: none; }}
      .cut-chip .txt {{ display: flex; flex-direction: column; gap: 3px; }}
      .cut-chip b {{ font-size: 25px; font-weight: 700; color: var(--cream); }}
      .cut-chip i {{
        font-style: normal; font-size: 16px; font-weight: 500;
        color: rgba(246, 241, 230, 0.86);
        text-transform: uppercase; letter-spacing: 0.09em;
      }}

      /* ---------- ambience PiP ---------- */
      #pip-wrap {{
        position: absolute; right: 78px; top: 150px; z-index: 8;
        width: 430px; height: 262px; border-radius: 16px; overflow: hidden;
        box-shadow: 0 26px 60px rgba(10, 15, 32, 0.45);
        border: 2px solid rgba(255, 255, 255, 0.55);
        opacity: 0;
      }}
      #pip-wrap video {{
        position: absolute; top: 50%; left: 50%;
        width: auto; height: auto; min-width: 100%; min-height: 100%;
        transform: translate(-50%, -52%) scale(1.06);
      }}
      #pip-label {{
        position: absolute; left: 0; right: 0; bottom: 0; z-index: 2;
        padding: 26px 16px 10px;
        background: linear-gradient(to top, rgba(16,22,43,0.9), rgba(16,22,43,0));
        font-size: 15px; font-weight: 600; letter-spacing: 0.08em;
        text-transform: uppercase; color: rgba(246, 241, 230, 0.95);
      }}

      /* ---------- captions ---------- */
      #cap-layer {{
        position: absolute; left: 110px; right: 470px; bottom: 74px;
        z-index: 30; height: 150px; pointer-events: none;
      }}
      .cap {{
        position: absolute; left: 0; right: 0; bottom: 0;
        text-align: center; opacity: 0;
      }}
      .cap span {{
        display: inline-block; max-width: 100%;
        background: rgba(10, 15, 30, 0.78);
        padding: 13px 28px; border-radius: 14px;
        font-size: 44px; font-weight: 700; line-height: 1.22;
        letter-spacing: -0.01em; color: #ffffff;
        box-shadow: 0 10px 34px rgba(6, 10, 22, 0.4);
      }}

      /* ---------- end card ---------- */
      #endcard {{
        position: absolute; inset: 0; z-index: 40; opacity: 0;
        background: var(--navy);
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        gap: 30px; text-align: center;
      }}
      #ec-glow {{
        position: absolute; top: 50%; left: 50%; width: 1100px; height: 1100px;
        transform: translate(-50%, -50%); border-radius: 50%;
        background: rgba(59, 91, 255, 0.2); filter: blur(60px); pointer-events: none;
      }}
      #ec-logo {{
        font-family: "Fraunces", serif; font-weight: 900; font-size: 122px;
        color: var(--cream); letter-spacing: -0.02em; position: relative;
      }}
      #ec-tag {{ font-size: 33px; color: rgba(246, 241, 230, 0.8); position: relative; }}
      #ec-url {{
        display: inline-flex; align-items: center; gap: 14px; position: relative;
        background: var(--blue); color: #fff; font-weight: 700; font-size: 26px;
        padding: 20px 40px; border-radius: 100px;
      }}
      #ec-sub {{ font-size: 20px; color: rgba(246, 241, 230, 0.62); position: relative; }}
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="{TOTAL}"
         data-width="1920" data-height="1080">

      <div id="base-wrap" data-layout-allow-overflow>
        <video id="base-v" class="clip" data-start="0" data-duration="{BASE_DUR}"
               data-track-index="0" src="assets/walkthrough.mp4" muted playsinline></video>
      </div>
      <audio id="vo" data-start="0" data-duration="{BASE_DUR}" data-track-index="1"
             src="assets/narration.m4a" data-volume="1"></audio>

      <div id="dim"></div>
{''.join(cut_html)}

      <div id="pip-wrap" data-layout-allow-overflow>
        <video id="pip-v" class="clip" data-start="38.0" data-duration="6.2"
               data-track-index="4" src="assets/pip_city.mp4" muted playsinline></video>
        <div id="pip-label">Fable Cities &middot; in the catalog</div>
      </div>

      <div id="cap-layer">
{chr(10).join(cap_html)}
      </div>

      <div id="endcard">
        <div id="ec-glow"></div>
        <div id="ec-logo">HeadStart</div>
        <div id="ec-tag">Every great game starts somewhere.</div>
        <div id="ec-url">headstart-virid.vercel.app <span>&rarr;</span></div>
        <div id="ec-sub">Browse the catalog &middot; remix with your own agent</div>
      </div>
    </div>

    <script>
      window.__timelines = window.__timelines || {{}};
      const tl = gsap.timeline({{ paused: true }});

      /* ---- base recording: slow push-ins on the static stretches ---- */
      tl.fromTo("#base-wrap", {{ scale: 1.0 }}, {{ scale: 1.05, duration: 7.4, ease: "none" }}, 18.6);
      tl.to("#base-wrap", {{ scale: 1.08, duration: 6.0, ease: "none" }}, 26.0);
      tl.to("#base-wrap", {{ scale: 1.0, duration: 0.7, ease: "power2.out" }}, 32.0);
      tl.to("#base-wrap", {{ scale: 1.045, duration: 10.0, ease: "none" }}, 36.0);
      tl.to("#base-wrap", {{ scale: 1.0, duration: 1.2, ease: "power1.inOut" }}, 46.0);

      /* ---- "a blank canvas" dim, lifted on the HeadStart reveal ---- */
      tl.to("#dim", {{ opacity: 0.5, duration: 2.0, ease: "power1.in" }}, 26.4);
      tl.to("#dim", {{ opacity: 0, duration: 0.5, ease: "power2.out" }}, 32.0);

      /* ---- b-roll cutaways ---- */
      const CUTS = [
        {cuts_js}
      ];
      CUTS.forEach(function (c) {{
        const w = "#" + c.id + "-wrap";
        const chip = "#" + c.id + "-chip";
        const end = c.start + c.dur;
        if (c.enter === "fade") {{
          tl.fromTo(w, {{ opacity: 0 }}, {{ opacity: 1, duration: 0.26, ease: "power2.inOut" }}, c.start);
        }} else {{
          tl.set(w, {{ opacity: 1 }}, c.start);
        }}
        if (c.exit === "fade") {{
          tl.to(w, {{ opacity: 0, duration: 0.32, ease: "power2.inOut" }}, end - 0.32);
        }}
        tl.set(w, {{ opacity: 0 }}, end);
        tl.fromTo(chip, {{ y: 16, opacity: 0 }},
          {{ y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }}, c.start + 0.12);
        tl.to(chip, {{ opacity: 0, duration: 0.2, ease: "power1.in" }}, end - 0.3);
        tl.set(chip, {{ opacity: 0 }}, end);
      }});

      /* ---- ambience PiP over the static monetization stretch ---- */
      tl.fromTo("#pip-wrap", {{ opacity: 0, y: 22, scale: 0.96 }},
        {{ opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.4)" }}, 38.0);
      tl.to("#pip-wrap", {{ opacity: 0, duration: 0.35, ease: "power2.in" }}, 43.85);
      tl.set("#pip-wrap", {{ opacity: 0 }}, 44.2);

      /* ---- captions ---- */
      const CAPS = [
        {caps_js}
      ];
      CAPS.forEach(function (g, i) {{
        const el = "#cap-" + i;
        tl.fromTo(el, {{ opacity: 0, y: 12 }},
          {{ opacity: 1, y: 0, duration: 0.16, ease: "power2.out" }}, g.s);
        tl.to(el, {{ opacity: 0, duration: 0.1, ease: "power2.in" }}, g.e - 0.1);
        tl.set(el, {{ opacity: 0, visibility: "hidden" }}, g.e);
      }});

      /* ---- end card ---- */
      tl.fromTo("#endcard", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.7, ease: "power2.inOut" }}, 71.2);
      tl.fromTo("#ec-logo", {{ scale: 0.88, opacity: 0 }},
        {{ scale: 1, opacity: 1, duration: 0.55, ease: "expo.out" }}, 71.5);
      tl.fromTo("#ec-tag", {{ y: 22, opacity: 0 }},
        {{ y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }}, 71.8);
      tl.fromTo("#ec-url", {{ y: 18, opacity: 0, scale: 0.92 }},
        {{ y: 0, opacity: 1, scale: 1, duration: 0.55, ease: "back.out(1.7)" }}, 72.05);
      tl.fromTo("#ec-sub", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.4, ease: "sine.out" }}, 72.35);
      tl.fromTo("#ec-glow", {{ scale: 0.95, opacity: 0.7 }},
        {{ scale: 1.08, opacity: 1, duration: 2.4, ease: "sine.inOut" }}, 71.4);

      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
'''

open('index.html', 'w').write(HTML)
print("wrote index.html", len(HTML), "bytes;", len(groups), "captions,", len(CUTS), "cutaways")
