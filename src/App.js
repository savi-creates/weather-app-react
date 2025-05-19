import "./styles.css";
import Search from "./Search";

export default function App() {
  return (
    <div className="App">
      <h1>Weather Search Engine</h1>
      <Search />

      <footer style={{ marginTop: "2rem", textAlign: "center" }}>
        {" "}
        Coded by Savannah Andresson and {""}
        <a
          href="https://github.com/savi-creates/weather-app-react"
          target="_blank"
          rel="noopener noreferrer"
        >
          is open-sourced on GitHub
        </a>
      </footer>
    </div>
  );
}
