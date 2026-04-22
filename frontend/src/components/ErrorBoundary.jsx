import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: "",
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorMessage: error?.message || "Неизвестная ошибка интерфейса",
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Ошибка интерфейса:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f4f7fb",
            padding: "24px",
          }}
        >
          <div
            style={{
              maxWidth: "720px",
              width: "100%",
              background: "#ffffff",
              borderRadius: "18px",
              padding: "32px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            }}
          >
            <h1 style={{ marginTop: 0 }}>Страница временно недоступна</h1>
            <p>
              Во время отрисовки интерфейса произошла ошибка. Ниже показано
              сообщение браузера:
            </p>
            <pre
              style={{
                whiteSpace: "pre-wrap",
                background: "#f8fafc",
                border: "1px solid #dbe4ee",
                borderRadius: "12px",
                padding: "16px",
                overflowX: "auto",
              }}
            >
              {this.state.errorMessage}
            </pre>

            <button
              onClick={this.handleReload}
              style={{
                marginTop: "16px",
                padding: "12px 18px",
                borderRadius: "12px",
                border: "none",
                background: "#1e66f5",
                color: "#fff",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Перезагрузить страницу
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}