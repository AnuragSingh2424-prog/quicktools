
"use client";

import { useEffect, useRef, useState } from "react";

type OutputFormat = "png" | "jpeg";
type Page = "home" | "about" | "contact" | "privacy";

const styles = `
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0}
button,a{font:inherit;-webkit-tap-highlight-color:transparent}
.qt{min-height:100vh;background:#070b16;color:#f8fafc;font-family:Arial,Helvetica,sans-serif;overflow:hidden}
.qt a{color:inherit;text-decoration:none}
.wrap{width:min(1120px,calc(100% - 40px));margin:auto}
.header{border-bottom:1px solid #ffffff15;background:#070b16}
.nav{min-height:76px;display:flex;align-items:center;justify-content:space-between;gap:18px}
.brand{display:flex;align-items:center;gap:11px;font-size:21px;font-weight:800;letter-spacing:-.7px}
.logo{width:41px;height:41px;display:grid;place-items:center;border-radius:13px;color:#06111d;font-size:22px;background:linear-gradient(135deg,#67e8f9,#60a5fa)}
.cyan{color:#67e8f9}
.links,.footer-links{display:flex;align-items:center;gap:22px;color:#a6b2c7;font-size:13px}
.links button,.footer-links button{border:0;background:none;color:inherit;cursor:pointer;padding:5px}
.links button:hover,.footer-links button:hover{color:#67e8f9}
.nav-button,.small-button{border:1px solid #27344a;padding:11px 15px;border-radius:11px;background:#111a2a;color:white;cursor:pointer}
.hero{text-align:center;padding:72px 0 40px}
.pill{display:inline-flex;align-items:center;gap:9px;padding:9px 15px;border:1px solid #67e8f933;border-radius:100px;background:#22d3ee12;color:#a5f3fc;font-size:13px}
.dot{width:7px;height:7px;border-radius:50%;background:#67e8f9}
.title{margin:27px auto 0;font-size:clamp(43px,7vw,76px);line-height:1.08;letter-spacing:-3px;font-weight:850}
.gradient{background:linear-gradient(95deg,#67e8f9,#60a5fa 55%,#a78bfa);color:transparent;background-clip:text;-webkit-background-clip:text}
.subtitle{max-width:620px;margin:22px auto 0;color:#9caac0;font-size:16px;line-height:1.85}
.trust{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:25px}
.trust span{border:1px solid #222e43;background:#ffffff06;color:#b9c6d8;padding:9px 12px;border-radius:99px;font-size:12px}
.converter{max-width:740px;margin:28px auto 0;padding:28px;border:1px solid #263248;border-radius:25px;background:#101827;box-shadow:0 30px 100px #0004}
.conv-head{display:flex;align-items:center;justify-content:space-between;gap:15px;text-align:left;margin-bottom:22px}
.conv-head h2{margin:0;font-size:19px}
.muted{color:#8f9db3;font-size:13px;line-height:1.7}
.limit{border:1px solid #2a364b;border-radius:9px;padding:9px 11px;color:#9daac0;font-size:11px}
.drop{width:100%;min-height:235px;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:25px;border:1px dashed #42536e;border-radius:18px;background:#090f1e;color:white;cursor:pointer;transition:.2s}
.drop:hover,.drop-active{border-color:#67e8f9;background:#0b1929}
.upload-icon{width:64px;height:64px;display:grid;place-items:center;border:1px solid #28445a;border-radius:19px;background:#13334a;color:#67e8f9;font-size:29px;margin-bottom:20px}
.preview{border:1px solid #253248;border-radius:16px;padding:14px;background:#090f1e;text-align:left}
.file-row{display:flex;align-items:center;gap:12px;margin-bottom:15px}
.file-icon{display:grid;place-items:center;flex-shrink:0;width:43px;height:43px;background:#14263a;color:#67e8f9;border-radius:12px;font-weight:800}
.file-details{min-width:0;flex:1}
.file-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:13px;font-weight:700}
.small-button{font-size:12px;padding:9px 11px}
.image-frame{min-height:170px;max-height:320px;display:grid;place-items:center;overflow:hidden;background:#101a2a;border-radius:12px;padding:8px}
.image-frame img{max-width:100%;max-height:290px;object-fit:contain}
.label{display:block;color:#c4cfdf;font-size:13px;font-weight:700;margin:19px 0 10px}
.formats{display:grid;grid-template-columns:1fr 1fr;gap:11px}
.format{text-align:left;border:1px solid #29364b;border-radius:13px;background:#0a1120;color:white;padding:15px;cursor:pointer}
.format.active{border-color:#51cfe7;background:#22d3ee12}
.format-name{display:block;font-weight:800;font-size:14px;margin-bottom:5px}
.format-desc{display:block;color:#8e9cb2;font-size:11px;line-height:1.5}
.convert-button{width:100%;margin-top:18px;padding:15px;border:0;border-radius:12px;background:linear-gradient(100deg,#67e8f9,#60a5fa);color:#07111d;font-weight:800;font-size:14px;cursor:pointer}
.convert-button:disabled{opacity:.55;cursor:wait}
.error{color:#fca5a5;font-size:13px;margin-top:13px}
.local-note{margin-top:18px;color:#8391a8;text-align:center;font-size:11px}
.local-note span{color:#4ade80}
.features{max-width:940px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin:58px auto 0;text-align:left}
.feature{border:1px solid #222e42;border-radius:18px;background:#101827b3;padding:23px;transition:.2s}
.feature:hover{transform:translateY(-3px);border-color:#3b526b}
.feature-icon{width:43px;height:43px;display:grid;place-items:center;border-radius:13px;background:#13293b;color:#67e8f9;font-size:22px}
.feature h3{margin:17px 0 8px;font-size:15px}
.feature p,.step p{margin:0;color:#91a0b6;font-size:13px;line-height:1.8}
.guide{max-width:850px;margin:85px auto 0;padding-top:45px;border-top:1px solid #202b3e;text-align:left}
.eyebrow{color:#67e8f9;text-transform:uppercase;letter-spacing:2px;font-size:11px;font-weight:800}
.guide h2{font-size:29px;margin:12px 0 26px}
.steps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px}
.step-number{color:#67e8f9;font-size:13px;font-weight:800}
.step h3{font-size:14px;margin:10px 0 7px}
.footer{border-top:1px solid #202a3d;margin-top:75px}
.footer-inner{min-height:82px;display:flex;align-items:center;justify-content:space-between;gap:20px;color:#8492a8;font-size:12px}
.content{max-width:850px;margin:0 auto;padding:60px 0 20px}
.content h1{font-size:clamp(36px,7vw,57px);letter-spacing:-2px;line-height:1.12;margin:12px 0 18px}
.content h2{font-size:21px;margin:30px 0 10px}
.content p,.content li{color:#a9b6ca;font-size:15px;line-height:1.9}
.content-card{margin-top:30px;padding:clamp(22px,5vw,40px);background:#101827;border:1px solid #263248;border-radius:18px}
.content a.inline-link{color:#67e8f9;text-decoration:underline;text-underline-offset:4px}
.info-box{padding:20px;border:1px solid #29364b;background:#0a1120;border-radius:12px;margin-top:22px}
.back-button{border:1px solid #29364b;border-radius:10px;background:#101827;color:#67e8f9;padding:10px 14px;cursor:pointer}
@media(max-width:700px){
.wrap{width:calc(100% - 28px)}
.nav{min-height:68px}
.brand{font-size:18px}
.logo{width:36px;height:36px}
.links{display:none}
.nav-button{font-size:12px;padding:10px}
.hero{padding-top:50px}
.title{letter-spacing:-1.8px;font-size:clamp(42px,11vw,60px)}
.subtitle{font-size:14px}
.converter{padding:17px;border-radius:20px;margin-top:30px}
.conv-head h2{font-size:17px}
.drop{min-height:215px;padding:18px}
.features{grid-template-columns:1fr;margin-top:38px}
.feature{padding:20px}
.guide{margin-top:60px}
.guide h2{font-size:25px}
.steps{grid-template-columns:1fr;gap:25px}
.footer{margin-top:50px}
.footer-inner{padding:25px 0;align-items:flex-start;flex-direction:column}
.content{padding-top:45px}
}
`;

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<OutputFormat>("png");
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [page, setPage] = useState<Page>("home");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const syncPage = () => {
      const value = new URLSearchParams(window.location.search).get("view");
      if (value === "about" || value === "contact" || value === "privacy") {
        setPage(value);
      } else {
        setPage("home");
      }
    };

    syncPage();
    window.addEventListener("popstate", syncPage);
    return () => window.removeEventListener("popstate", syncPage);
  }, []);

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function navigate(next: Page) {
    const url = next === "home" ? "/" : `/?view=${next}`;
    window.history.pushState({}, "", url);
    setPage(next);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function chooseFile(selected?: File) {
    if (!selected) return;
    setError("");

    if (!["image/jpeg", "image/png"].includes(selected.type)) {
      setError("Please select a JPG, JPEG, or PNG image.");
      return;
    }
    if (selected.size > 20 * 1024 * 1024) {
      setError("Your image must be smaller than 20 MB.");
      return;
    }

    setFile(selected);
    setFormat(selected.type === "image/png" ? "jpeg" : "png");
  }

  function reset() {
    setFile(null);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  }

  function convertImage() {
    if (!file || !preview || busy) return;
    setBusy(true);
    setError("");

    const image = new Image();

    image.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Canvas is unavailable.");

        if (format === "jpeg") {
          context.fillStyle = "#ffffff";
          context.fillRect(0, 0, canvas.width, canvas.height);
        }
        context.drawImage(image, 0, 0);

        canvas.toBlob((blob) => {
          setBusy(false);
          if (!blob) {
            setError("Conversion failed. Please try another image.");
            return;
          }

          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          const name = file.name.replace(/\.[^.]+$/, "");
          link.href = url;
          link.download = `${name}.${format === "jpeg" ? "jpg" : "png"}`;
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.setTimeout(() => URL.revokeObjectURL(url), 1500);
        }, format === "jpeg" ? "image/jpeg" : "image/png", 0.92);
      } catch {
        setBusy(false);
        setError("Something went wrong while converting the image.");
      }
    };

    image.onerror = () => {
      setBusy(false);
      setError("We couldn't read this image. Please select another.");
    };
    image.src = preview;
  }

  function Header() {
    return (
      <header className="header">
        <nav className="wrap nav">
          <button className="brand" onClick={() => navigate("home")} style={{ border: 0, background: "none", color: "white", cursor: "pointer" }}>
            <span className="logo">Q</span>
            <span>Quick<span className="cyan">Tools</span></span>
          </button>
          <div className="links">
            <button onClick={() => navigate("home")}>Converter</button>
            <button onClick={() => navigate("about")}>About</button>
            <button onClick={() => navigate("contact")}>Contact</button>
          </div>
          <button className="nav-button" onClick={() => navigate("home")}>
            {page === "home" ? "Start converting ↗" : "Back to converter"}
          </button>
        </nav>
      </header>
    );
  }

  function Footer() {
    return (
      <footer className="footer">
        <div className="wrap footer-inner">
          <button className="brand" onClick={() => navigate("home")} style={{ border: 0, background: "none", color: "white", cursor: "pointer" }}>
            Quick<span className="cyan">Tools</span>
          </button>
          <span>© 2026 QuickTools. Simple tools for everyone.</span>
          <div className="footer-links">
            <button onClick={() => navigate("about")}>About</button>
            <button onClick={() => navigate("contact")}>Contact</button>
            <button onClick={() => navigate("privacy")}>Privacy</button>
          </div>
        </div>
      </footer>
    );
  }

  function AboutPage() {
    return (
      <section className="content">
        <div className="eyebrow">About us</div>
        <h1>Tools that keep things simple.</h1>
        <p>QuickTools makes everyday image conversion straightforward, accessible, and easy to use.</p>
        <div className="content-card">
          <h2>What is QuickTools?</h2>
          <p>QuickTools is an online utility that helps people convert images between JPG and PNG formats. Select an image, choose an output format, and download the converted file.</p>
          <h2>Our approach</h2>
          <p>Our goal is to make useful digital tools easy to understand and use, without unnecessary steps or complicated software.</p>
          <h2>Image privacy</h2>
          <p>The converter processes your selected image in your browser and does not upload it to a QuickTools conversion server. Website hosting and third-party services may still process technical information as described in our privacy policy.</p>
          <button className="nav-button" onClick={() => navigate("home")}>Try the converter →</button>
        </div>
      </section>
    );
  }

  function ContactPage() {
    return (
      <section className="content">
        <div className="eyebrow">Contact</div>
        <h1>We'd love to hear from you.</h1>
        <p>Questions, feedback, or found a problem? We welcome messages about QuickTools.</p>
        <div className="content-card">
          <h2>Support and feedback</h2>
          <p>For help with the converter or to suggest an improvement, contact the website owner using the support email published here.</p>
          <div className="info-box">
            <h3 style={{ marginTop: 0 }}>Email support</h3>
            <p style={{ marginBottom: 0 }}>Replace this text with your real public support email before publishing your website.</p>
          </div>
          <p style={{ fontSize: 13 }}>Please don't include passwords or other sensitive information in support messages.</p>
          <button className="nav-button" onClick={() => navigate("home")}>Back to QuickTools</button>
        </div>
      </section>
    );
  }

  function PrivacyPage() {
    return (
      <section className="content">
        <div className="eyebrow">Your privacy</div>
        <h1>Privacy Policy</h1>
        <p className="muted">Last updated: October 20, 2026</p>
        <div className="content-card">
          <h2>1. Introduction</h2>
          <p>This policy explains how information may be handled when you visit QuickTools and use its image converter.</p>

          <h2>2. Image processing</h2>
          <p>JPG and PNG conversion takes place in your browser. The converter does not send the selected image to a QuickTools conversion server. Your browser may keep temporary local data while the page is in use.</p>

          <h2>3. Hosting and technical information</h2>
          <p>Website hosting and security providers may process technical information such as IP addresses, browser details, request logs, and security events to deliver and protect the website. Actual collection depends on the services configured for the published site.</p>

          <h2>4. Cookies and similar technologies</h2>
          <p>The site or third-party services may use cookies or similar technologies for essential functions, security, analytics, or advertising when enabled. Browser settings and any consent controls available on the site may provide ways to manage these technologies.</p>

          <h2>5. Advertising</h2>
          <p>If Google AdSense or another advertising service is added, its providers may process information and use cookies or similar technologies to deliver and measure ads, prevent fraud, and personalize advertising where permitted. These providers have their own privacy policies.</p>
          <p>Learn more in <a className="inline-link" href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">Google's advertising information</a>.</p>

          <h2>6. Use of information</h2>
          <p>Technical information may be used to operate the website, troubleshoot errors, protect against abuse, and support analytics or advertising services when configured.</p>

          <h2>7. Retention and security</h2>
          <p>Retention depends on the relevant provider and the purpose of processing. Reasonable safeguards should be used, but no online service can guarantee absolute security.</p>

          <h2>8. Your choices and rights</h2>
          <p>Depending on your location and applicable law, you may have rights concerning personal information and choices about advertising or cookies. You may also have access to browser and consent controls.</p>

          <h2>9. Children's privacy</h2>
          <p>QuickTools is a general-purpose utility and is not intended to knowingly collect children's personal information in violation of applicable law.</p>

          <h2>10. Changes to this policy</h2>
          <p>This policy may be updated when the website, its providers, or legal requirements change. The revision date will be updated when material changes are made.</p>

          <h2>11. Contact</h2>
          <p>For privacy questions, use the contact information published on our <button onClick={() => navigate("contact")} style={{ border: 0, padding: 0, background: "none", color: "#67e8f9", cursor: "pointer", textDecoration: "underline" }}>Contact page</button>.</p>
          <p className="muted">Before publication, make sure this policy accurately describes your actual hosting, cookies, advertising, and data practices. Add any required consent controls and a working contact method.</p>
          <button className="nav-button" onClick={() => navigate("home")}>Back to QuickTools</button>
        </div>
      </section>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <main className="qt">
        <Header />

        {page === "home" && (
          <section className="wrap">
            <div className="hero">
              <div className="pill"><span className="dot" /> Simple tools. Better workflow.</div>
              <h1 className="title">Your images,<br /><span className="gradient">your format.</span></h1>
              <p className="subtitle">Convert JPG to PNG or PNG to JPG in seconds. No complicated software, no account, no image upload to our server.</p>
              <div className="trust">
                <span>✓ Free to use</span><span>✓ Browser-based</span><span>✓ JPG &amp; PNG</span>
              </div>

              <div id="converter" className="converter">
                <div className="conv-head">
                  <div><h2>Image converter</h2><div className="muted" style={{ marginTop: 5 }}>Choose an image to get started</div></div>
                  <span className="limit">MAX 20 MB</span>
                </div>

                <input ref={inputRef} type="file" accept="image/jpeg,image/png,.jpg,.jpeg,.png" hidden onChange={(event) => chooseFile(event.target.files?.[0])} />

                {!file ? (
                  <button type="button" className={`drop${dragging ? " drop-active" : ""}`}
                    onClick={() => inputRef.current?.click()}
                    onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(event) => { event.preventDefault(); setDragging(false); chooseFile(event.dataTransfer.files[0]); }}>
                    <span className="upload-icon">↑</span>
                    <span style={{ fontSize: 18, fontWeight: 750 }}>Drop your image here</span>
                    <span className="muted" style={{ marginTop: 10 }}>or <span style={{ color: "#67e8f9", textDecoration: "underline" }}>browse files</span> from your device</span>
                    <span className="muted" style={{ marginTop: 18, fontSize: 11 }}>JPG, JPEG or PNG · Maximum file size 20 MB</span>
                  </button>
                ) : (
                  <div className="preview">
                    <div className="file-row">
                      <div className="file-icon">IMG</div>
                      <div className="file-details">
                        <div className="file-name">{file.name}</div>
                        <div className="muted" style={{ marginTop: 4, fontSize: 11 }}>{(file.size / 1024).toFixed(1)} KB · {file.type.split("/")[1].toUpperCase()}</div>
                      </div>
                      <button type="button" className="small-button" onClick={reset}>Remove</button>
                    </div>
                    <div className="image-frame"><img src={preview} alt="Selected image preview" /></div>
                    <label className="label">Output format</label>
                    <div className="formats">
                      <button type="button" aria-pressed={format === "png"} className={`format${format === "png" ? " active" : ""}`} onClick={() => setFormat("png")}>
                        <span className="format-name">PNG</span><span className="format-desc">Supports transparency</span>
                      </button>
                      <button type="button" aria-pressed={format === "jpeg"} className={`format${format === "jpeg" ? " active" : ""}`} onClick={() => setFormat("jpeg")}>
                        <span className="format-name">JPG</span><span className="format-desc">Great for photographs</span>
                      </button>
                    </div>
                    {format === "jpeg" && file.type === "image/png" && <p className="muted" style={{ color: "#fbbf24" }}>Transparent areas will become white in the JPG output.</p>}
                    <button type="button" className="convert-button" disabled={busy} onClick={convertImage}>{busy ? "Converting your image..." : `Convert & download ${format === "png" ? "PNG" : "JPG"} ↓`}</button>
                  </div>
                )}

                {error && <p className="error" role="alert">{error}</p>}
                <div className="local-note"><span>●</span> Your image is processed locally in your browser</div>
              </div>

              <div id="features" className="features">
                <article className="feature"><div className="feature-icon">◇</div><h3>Privacy first</h3><p>Your selected image is processed locally in your browser, without uploading it to our conversion server.</p></article>
                <article className="feature"><div className="feature-icon">ϟ</div><h3>Fast &amp; simple</h3><p>A straightforward workflow lets you convert and download your image in a few clicks.</p></article>
                <article className="feature"><div className="feature-icon">▧</div><h3>Two useful formats</h3><p>Choose PNG for transparency or JPG for photographs and everyday image sharing.</p></article>
              </div>

              <section id="guide" className="guide">
                <div className="eyebrow">Made simple</div><h2>Convert images in three steps</h2>
                <div className="steps">
                  <div className="step"><div className="step-number">01 / SELECT</div><h3>Choose an image</h3><p>Select a JPG or PNG image from your device.</p></div>
                  <div className="step"><div className="step-number">02 / CONVERT</div><h3>Pick your format</h3><p>Choose the output format that suits your needs.</p></div>
                  <div className="step"><div className="step-number">03 / DOWNLOAD</div><h3>Save your image</h3><p>Download your converted image directly to your device.</p></div>
                </div>
              </section>
            </div>
          </section>
        )}

        {page === "about" && <section className="wrap"><AboutPage /></section>}
        {page === "contact" && <section className="wrap"><ContactPage /></section>}
        {page === "privacy" && <section className="wrap"><PrivacyPage /></section>}

        <Footer />
      </main>
    </>
  );
}
