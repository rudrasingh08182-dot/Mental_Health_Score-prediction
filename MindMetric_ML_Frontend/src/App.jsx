import React, { useState } from "react";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"
).replace(/\/$/, "");

const platforms = [
  "Facebook",
  "LinkedIn",
  "Instagram",
  "Snapchat",
  "Twitter",
  "YouTube",
  "TikTok",
  "LINE",
  "KakaoTalk",
  "VKontakte",
  "WhatsApp",
  "WeChat",
];

const countries = [
  "Other",
  "India",
  "USA",
  "Canada",
  "Australia",
  "UK",
  "Germany",
  "Mexico",
  "Turkey",
  "France",
];

const initialForm = {
  Age: "",
  Gender: "",
  Country: "India",
  Academic_Level: "",
  Most_Used_Platform: "",
  Purpose_Of_Use: "",
  Avg_Daily_Usage_Hours: "",
  DailyUnlocks: "",
  Study_Hours: "",
  Physical_Activity_Hours: "",
  Sleep_Hours_Per_Night: "",
  Stress_Level: "",
};

function Icon({ name, size = 20 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  if (name === "user") {
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5.5 20c.8-3.3 3-5 6.5-5s5.7 1.7 6.5 5" />
      </svg>
    );
  }

  if (name === "globe") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3c2.2 2.5 3.3 5.5 3.3 9s-1.1 6.5-3.3 9c-2.2-2.5-3.3-5.5-3.3-9S9.8 5.5 12 3Z" />
      </svg>
    );
  }

  if (name === "book") {
    return (
      <svg {...common}>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Z" />
        <path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" />
      </svg>
    );
  }

  if (name === "phone") {
    return (
      <svg {...common}>
        <rect x="7" y="2.8" width="10" height="18.4" rx="2" />
        <path d="M10.5 18h3" />
      </svg>
    );
  }

  if (name === "clock") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.2 2" />
      </svg>
    );
  }

  if (name === "activity") {
    return (
      <svg {...common}>
        <path d="M3 12h4l2-6 4.5 12 2-6H21" />
      </svg>
    );
  }

  if (name === "moon") {
    return (
      <svg {...common}>
        <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" />
      </svg>
    );
  }

  if (name === "brain") {
    return (
      <svg {...common}>
        <path d="M9.5 4.2A3 3 0 0 0 6 6.8 3.2 3.2 0 0 0 6.7 13 3 3 0 0 0 9 18.2" />
        <path d="M14.5 4.2A3 3 0 0 1 18 6.8a3.2 3.2 0 0 1-.7 6.2 3 3 0 0 1-2.3 5.2" />
        <path d="M9.5 4.2v15.6M14.5 4.2v15.6M9.5 9h-2M14.5 9h2M9.5 14h-2M14.5 14h2" />
      </svg>
    );
  }

  if (name === "spark") {
    return (
      <svg {...common}>
        <path d="m12 3 1.4 5.6L19 10l-5.6 1.4L12 17l-1.4-5.6L5 10l5.6-1.4L12 3Z" />
        <path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z" />
      </svg>
    );
  }

  if (name === "arrow") {
    return (
      <svg {...common}>
        <path d="M5 12h13" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    );
  }

  if (name === "refresh") {
    return (
      <svg {...common}>
        <path d="M20 11a8 8 0 0 0-14.7-4L3 10" />
        <path d="M3 5v5h5" />
        <path d="M4 13a8 8 0 0 0 14.7 4L21 14" />
        <path d="M21 19v-5h-5" />
      </svg>
    );
  }

  if (name === "shield") {
    return (
      <svg {...common}>
        <path d="M12 3 20 6v5c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-3Z" />
        <path d="m8.5 12 2.2 2.2 4.8-5" />
      </svg>
    );
  }

  return null;
}

function Field({ label, hint, icon, children }) {
  return (
    <div className="field">
      <label>
        {icon && (
          <span className="field-icon">
            <Icon name={icon} size={16} />
          </span>
        )}

        {label}
      </label>

      {children}

      {hint && <span className="hint">{hint}</span>}
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
  placeholder = "Select an option",
}) {
  return (
    <select value={value} onChange={onChange}>
      <option value="" disabled>
        {placeholder}
      </option>

      {options.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}

function App() {
  const [form, setForm] = useState(initialForm);

  const [result, setResult] = useState(null);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const update = (key) => (e) => {
    setForm((previous) => ({
      ...previous,
      [key]: e.target.value,
    }));

    setError("");
    setResult(null);
  };

  const validate = () => {
    const fields = {
      Age: form.Age,
      Gender: form.Gender,
      Country: form.Country,
      Academic_Level: form.Academic_Level,
      Most_Used_Platform: form.Most_Used_Platform,
      Purpose_Of_Use: form.Purpose_Of_Use,
      Avg_Daily_Usage_Hours: form.Avg_Daily_Usage_Hours,
      DailyUnlocks: form.DailyUnlocks,
      Study_Hours: form.Study_Hours,
      Physical_Activity_Hours: form.Physical_Activity_Hours,
      Sleep_Hours_Per_Night: form.Sleep_Hours_Per_Night,
      Stress_Level: form.Stress_Level,
    };

    const missing = Object.entries(fields).find(
      ([, value]) =>
        value === undefined ||
        value === null ||
        String(value).trim() === ""
    );

    if (missing) {
      return `Please fill the "${missing[0]}" field.`;
    }

    const age = Number(form.Age);

    const usage = Number(form.Avg_Daily_Usage_Hours);

    const unlocks = Number(form.DailyUnlocks);

    const study = Number(form.Study_Hours);

    const activity = Number(form.Physical_Activity_Hours);

    const sleep = Number(form.Sleep_Hours_Per_Night);

    if (!Number.isFinite(age) || age < 10 || age > 100) {
      return "Age must be between 10 and 100.";
    }

    if (!Number.isFinite(usage) || usage < 0 || usage > 24) {
      return "Average daily usage must be between 0 and 24 hours.";
    }

    if (!Number.isFinite(unlocks) || unlocks < 0) {
      return "Daily unlocks cannot be negative.";
    }

    if (!Number.isFinite(study) || study < 0 || study > 24) {
      return "Study hours must be between 0 and 24.";
    }

    if (!Number.isFinite(activity) || activity < 0 || activity > 24) {
      return "Physical activity must be between 0 and 24.";
    }

    if (!Number.isFinite(sleep) || sleep < 0 || sleep > 24) {
      return "Sleep hours must be between 0 and 24.";
    }

    return "";
  };

  const predict = async (e) => {
    e.preventDefault();

    setError("");
    setResult(null);

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    /*
      IMPORTANT:
      These names EXACTLY match your FastAPI StudentData model.
    */

    const payload = {
      Age: Number(form.Age),

      Gender: form.Gender,

      Country: form.Country,

      Academic_Level: form.Academic_Level,

      Most_Used_Platform: form.Most_Used_Platform,

      Purpose_Of_Use: form.Purpose_Of_Use,

      Avg_Daily_Usage_Hours: Number(
        form.Avg_Daily_Usage_Hours
      ),

      Daily_Unlocks: Number(form.DailyUnlocks),

      Study_Hours: Number(form.Study_Hours),

      Physical_Activity_Hours: Number(
        form.Physical_Activity_Hours
      ),

      Sleep_Hours_Per_Night: Number(
        form.Sleep_Hours_Per_Night
      ),

      Stress_Level: form.Stress_Level,
    };

    console.log("Sending to FastAPI:", payload);

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      console.log("FastAPI response:", data);

      if (!response.ok) {
        let message = `Prediction request failed (${response.status}).`;

        if (Array.isArray(data.detail)) {
          message = data.detail
            .map((item) => {
              const field =
                item.loc && item.loc.length
                  ? item.loc[item.loc.length - 1]
                  : "field";

              return `${field}: ${item.msg}`;
            })
            .join(" | ");
        } else if (data.detail) {
          message = data.detail;
        }

        throw new Error(message);
      }

      if (
        data.predicted_mental_score === undefined ||
        data.predicted_mental_score === null
      ) {
        throw new Error(
          "FastAPI response does not contain predicted_mental_score."
        );
      }

      const prediction = Number(
        data.predicted_mental_score
      );

      if (!Number.isFinite(prediction)) {
        throw new Error(
          "Invalid prediction received from FastAPI."
        );
      }

      setResult({
        score: prediction,
        category: data.mental_health_category,
      });

      setTimeout(() => {
        document
          .getElementById("result")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
      }, 100);
    } catch (err) {
      console.error("Prediction error:", err);

      if (
        err instanceof TypeError &&
        err.message.toLowerCase().includes("fetch")
      ) {
        setError(
          `Cannot connect to FastAPI at ${API_URL}. Make sure FastAPI is running.`
        );
      } else {
        setError(
          err.message ||
            "Something went wrong while making the prediction."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setForm({
      ...initialForm,
    });

    setResult(null);

    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="app-shell">

      <div className="ambient ambient-one" />

      <div className="ambient ambient-two" />

      <header className="navbar">

        <a
          className="brand"
          href="#top"
        >
          <span className="brand-mark">
            <Icon
              name="brain"
              size={21}
            />
          </span>

          <span>
            Mind<span>Metric</span>
          </span>
        </a>

        <nav>
          <a href="#predictor">
            Predictor
          </a>

          <a href="#how-it-works">
            How it works
          </a>
        </nav>

        <div className="status-pill">
          <span />
          API ready
        </div>

      </header>

      <main id="top">

        {/* HERO */}

        <section className="hero">

          <div className="hero-copy">

            <div className="eyebrow">
              <Icon
                name="spark"
                size={15}
              />

              MACHINE LEARNING INSIGHT
            </div>

            <h1>
              Understand your{" "}
              <em>digital</em>{" "}
              wellbeing.
            </h1>

            <p>
              Enter a few lifestyle and social-media
              patterns to generate a machine-learning
              based mental health score.
            </p>

            <a
              className="hero-cta"
              href="#predictor"
            >
              Start assessment

              <Icon
                name="arrow"
                size={17}
              />
            </a>

          </div>

          <div className="hero-card">

            <div className="hero-card-top">

              <span className="mini-label">
                MODEL OUTPUT
              </span>

              <span className="live-dot">
                LIVE
              </span>

            </div>

            <div className="score-placeholder">

              <span className="score-dash">
                —
              </span>

              <span>
                Awaiting assessment
              </span>

            </div>

            <div className="hero-line">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>

            <p>
              Your prediction appears here after
              the assessment.
            </p>

          </div>

        </section>

        {/* TRUST */}

        <section className="trust-strip">

          <div>
            <Icon
              name="shield"
              size={18}
            />

            <span>
              Privacy-first interface
            </span>
          </div>

          <div>
            <Icon
              name="brain"
              size={18}
            />

            <span>
              ML-powered prediction
            </span>
          </div>

          <div>
            <Icon
              name="clock"
              size={18}
            />

            <span>
              Fast API response
            </span>
          </div>

        </section>

        {/* PREDICTOR */}

        <section
          className="predictor-section"
          id="predictor"
        >

          <div className="section-heading">

            <div>

              <div className="eyebrow">
                PERSONAL ASSESSMENT
              </div>

              <h2>
                Tell us about your routine.
              </h2>

            </div>

            <p>
              Use your typical daily values for a
              more representative prediction.
            </p>

          </div>

          <form
            className="predictor-card"
            onSubmit={predict}
          >

            {/* SECTION 01 */}

            <div className="form-section">

              <div className="form-section-title">

                <span className="section-number">
                  01
                </span>

                <div>
                  <h3>
                    About you
                  </h3>

                  <p>
                    Basic profile information
                  </p>
                </div>

              </div>

              <div className="field-grid">

                <Field
                  label="Age"
                  icon="user"
                  hint="10–100 years"
                >
                  <input
                    type="number"
                    min="10"
                    max="100"
                    placeholder="e.g. 21"
                    value={form.Age}
                    onChange={update("Age")}
                  />
                </Field>

                <Field
                  label="Gender"
                  icon="user"
                >
                  <Select
                    value={form.Gender}
                    onChange={update("Gender")}
                    options={[
                      "Male",
                      "Female",
                    ]}
                  />
                </Field>

                <Field
                  label="Country"
                  icon="globe"
                >
                  <Select
                    value={form.Country}
                    onChange={update("Country")}
                    options={countries}
                  />
                </Field>

                <Field
                  label="Academic level"
                  icon="book"
                >
                  <Select
                    value={form.Academic_Level}
                    onChange={update(
                      "Academic_Level"
                    )}
                    options={[
                      "Undergraduate",
                      "Graduate",
                      "High School",
                    ]}
                  />
                </Field>

              </div>

            </div>

            <div className="form-divider" />

            {/* SECTION 02 */}

            <div className="form-section">

              <div className="form-section-title">

                <span className="section-number">
                  02
                </span>

                <div>
                  <h3>
                    Digital habits
                  </h3>

                  <p>
                    Your social media usage patterns
                  </p>
                </div>

              </div>

              <div className="field-grid">

                <Field
                  label="Most used platform"
                  icon="phone"
                >
                  <Select
                    value={
                      form.Most_Used_Platform
                    }
                    onChange={update(
                      "Most_Used_Platform"
                    )}
                    options={platforms}
                  />
                </Field>

                <Field
                  label="Primary purpose"
                  icon="spark"
                >
                  <Select
                    value={form.Purpose_Of_Use}
                    onChange={update(
                      "Purpose_Of_Use"
                    )}
                    options={[
                      "Networking",
                      "Education",
                      "Entertainment",
                      "News",
                    ]}
                  />
                </Field>

                <Field
                  label="Average daily usage"
                  icon="clock"
                  hint="Hours per day"
                >
                  <div className="input-suffix">

                    <input
                      type="number"
                      min="0"
                      max="24"
                      step="0.1"
                      placeholder="e.g. 4.5"
                      value={
                        form.Avg_Daily_Usage_Hours
                      }
                      onChange={update(
                        "Avg_Daily_Usage_Hours"
                      )}
                    />

                    <span>
                      hrs
                    </span>

                  </div>
                </Field>

                <Field
                  label="Daily unlocks"
                  icon="phone"
                  hint="Times per day"
                >
                  <input
                    type="number"
                    min="0"
                    step="1"
                    placeholder="e.g. 65"
                    value={form.DailyUnlocks}
                    onChange={update(
                      "DailyUnlocks"
                    )}
                  />
                </Field>

              </div>

            </div>

            <div className="form-divider" />

            {/* SECTION 03 */}

            <div className="form-section">

              <div className="form-section-title">

                <span className="section-number">
                  03
                </span>

                <div>
                  <h3>
                    Daily routine
                  </h3>

                  <p>
                    Balance, activity and recovery
                  </p>
                </div>

              </div>

              <div className="field-grid">

                <Field
                  label="Study hours"
                  icon="book"
                >
                  <div className="input-suffix">

                    <input
                      type="number"
                      min="0"
                      max="24"
                      step="0.1"
                      placeholder="e.g. 5"
                      value={form.Study_Hours}
                      onChange={update(
                        "Study_Hours"
                      )}
                    />

                    <span>
                      hrs
                    </span>

                  </div>
                </Field>

                <Field
                  label="Physical activity"
                  icon="activity"
                >
                  <div className="input-suffix">

                    <input
                      type="number"
                      min="0"
                      max="24"
                      step="0.1"
                      placeholder="e.g. 1"
                      value={
                        form.Physical_Activity_Hours
                      }
                      onChange={update(
                        "Physical_Activity_Hours"
                      )}
                    />

                    <span>
                      hrs
                    </span>

                  </div>
                </Field>

                <Field
                  label="Sleep per night"
                  icon="moon"
                >
                  <div className="input-suffix">

                    <input
                      type="number"
                      min="0"
                      max="24"
                      step="0.1"
                      placeholder="e.g. 7.5"
                      value={
                        form.Sleep_Hours_Per_Night
                      }
                      onChange={update(
                        "Sleep_Hours_Per_Night"
                      )}
                    />

                    <span>
                      hrs
                    </span>

                  </div>
                </Field>

                <Field
                  label="Stress level"
                  icon="activity"
                >
                  <Select
                    value={form.Stress_Level}
                    onChange={update(
                      "Stress_Level"
                    )}
                    options={[
                      "Low",
                      "Medium",
                      "High",
                      "Very High",
                    ]}
                  />
                </Field>

              </div>

            </div>

            {/* ERROR */}

            {error && (
              <div
                className="error-box"
                role="alert"
              >
                <strong>
                  Unable to predict
                </strong>

                <span>
                  {error}
                </span>
              </div>
            )}

            {/* ACTION */}

            <div className="form-actions">

              <div className="privacy-note">

                <Icon
                  name="shield"
                  size={17}
                />

                <span>
                  Data is sent only to your
                  configured FastAPI endpoint.
                </span>

              </div>

              <button
                className="predict-btn"
                type="submit"
                disabled={loading}
              >

                {loading ? (
                  <>
                    <span className="spinner" />

                    Predicting...
                  </>
                ) : (
                  <>
                    Generate prediction

                    <Icon
                      name="arrow"
                      size={18}
                    />
                  </>
                )}

              </button>

            </div>

          </form>

        </section>

        {/* RESULT */}

        {result !== null && (() => {
          const { score, category } = result;
          const levelColors = {
            safe:     { bg: "#f0fdf4", border: "#16a34a", badge: "#16a34a", text: "#14532d" },
            normal:   { bg: "#eff6ff", border: "#2563eb", badge: "#2563eb", text: "#1e3a8a" },
            caution:  { bg: "#fefce8", border: "#ca8a04", badge: "#ca8a04", text: "#713f12" },
            danger:   { bg: "#fff7ed", border: "#ea580c", badge: "#ea580c", text: "#7c2d12" },
            critical: { bg: "#fef2f2", border: "#dc2626", badge: "#dc2626", text: "#7f1d1d" },
          };
          const colors = category ? levelColors[category.level] || levelColors.normal : levelColors.normal;
          return (
            <section className="result-section" id="result">
              <div className="result-card">
                <div className="result-copy">
                  <div className="eyebrow">MODEL RESULT</div>
                  <h2>Your predicted mental health score</h2>
                  <p>
                    This is the score returned directly by your trained
                    machine-learning model. The interface does not change
                    or invent the model output.
                  </p>
                  <button className="outline-btn" onClick={reset} type="button">
                    <Icon name="refresh" size={17} />
                    New assessment
                  </button>
                </div>

                <div className="score-display">
                  <div className="score-ring">
                    <div>
                      <strong>{Number(score).toFixed(2)}</strong>
                      <span>score</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Category Card ── */}
              {category && (
                <div
                  style={{
                    marginTop: "1.5rem",
                    padding: "1.4rem 1.8rem",
                    borderRadius: "14px",
                    background: colors.bg,
                    border: `2px solid ${colors.border}`,
                    maxWidth: "680px",
                    marginInline: "auto",
                  }}
                >
                  {/* Header row */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.9rem" }}>
                    <span style={{ fontSize: "2rem", lineHeight: 1 }}>{category.emoji}</span>
                    <div>
                      <div style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", color: colors.badge, marginBottom: "0.15rem" }}>
                        Mental Health Status
                      </div>
                      <div style={{ fontSize: "1.45rem", fontWeight: 800, color: colors.text }}>
                        {category.label}
                      </div>
                    </div>
                    <span
                      style={{
                        marginLeft: "auto",
                        padding: "0.3rem 0.9rem",
                        borderRadius: "999px",
                        background: colors.badge,
                        color: "#fff",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Score: {Number(score).toFixed(2)} / 10
                    </span>
                  </div>

                  {/* Divider */}
                  <div style={{ height: "1px", background: colors.border, opacity: 0.3, marginBottom: "0.9rem" }} />

                  {/* Description */}
                  <p style={{ fontSize: "0.93rem", color: colors.text, marginBottom: "0.6rem", lineHeight: 1.6 }}>
                    {category.description}
                  </p>

                  {/* Advice box */}
                  <div
                    style={{
                      padding: "0.7rem 1rem",
                      borderRadius: "8px",
                      background: "rgba(0,0,0,0.04)",
                      display: "flex",
                      gap: "0.5rem",
                      alignItems: "flex-start",
                    }}
                  >
                    <span style={{ fontSize: "1rem", marginTop: "0.05rem" }}>💡</span>
                    <span style={{ fontSize: "0.85rem", color: colors.text, lineHeight: 1.55 }}>
                      <strong>Recommendation: </strong>{category.advice}
                    </span>
                  </div>

                  {/* Score scale bar */}
                  <div style={{ marginTop: "1rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: colors.text, marginBottom: "0.3rem", opacity: 0.7 }}>
                      <span>3.5 — Critical</span>
                      <span>5.0 — Fair</span>
                      <span>6.5 — Good</span>
                      <span>8.0 — Excellent</span>
                    </div>
                    <div style={{ height: "8px", borderRadius: "999px", background: "linear-gradient(90deg, #dc2626, #ea580c, #ca8a04, #2563eb, #16a34a)", position: "relative" }}>
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: `${Math.min(100, Math.max(0, ((score - 3.5) / (9.5 - 3.5)) * 100))}%`,
                          transform: "translate(-50%, -50%)",
                          width: "14px",
                          height: "14px",
                          borderRadius: "50%",
                          background: "#fff",
                          border: `3px solid ${colors.border}`,
                          boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </section>
          );
        })()}



        {/* HOW IT WORKS */}

        <section
          className="how-section"
          id="how-it-works"
        >

          <div className="eyebrow">
            THE FLOW
          </div>

          <h2>
            Simple in. Smart out.
          </h2>

          <div className="steps">

            <div className="step">

              <span>
                01
              </span>

              <Icon
                name="user"
                size={22}
              />

              <h3>
                Enter your data
              </h3>

              <p>
                Provide the lifestyle and usage
                values requested by the model.
              </p>

            </div>

            <div className="step">

              <span>
                02
              </span>

              <Icon
                name="spark"
                size={22}
              />

              <h3>
                Run prediction
              </h3>

              <p>
                The frontend sends your values to the
                existing FastAPI /predict endpoint.
              </p>

            </div>

            <div className="step">

              <span>
                03
              </span>

              <Icon
                name="brain"
                size={22}
              />

              <h3>
                View the score
              </h3>

              <p>
                The returned prediction is presented
                clearly without changing the model
                output.
              </p>

            </div>

          </div>

        </section>

      </main>

      <footer>

        <div className="brand">

          <span className="brand-mark">

            <Icon
              name="brain"
              size={17}
            />

          </span>

          <span>
            Mind<span>Metric</span>
          </span>

        </div>

        <p>
          Machine Learning Mental Health Predictor
        </p>

      </footer>

    </div>
  );
}

export default App;