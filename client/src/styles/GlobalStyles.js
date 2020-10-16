import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *, *::after, *::before {
    box-sizing: inherit;
  }

  :root {
     --blue: #1DA1F2;
     --red: #E63068;
     --green: #17BF63;
     --orange: #FFAD1F;
     --bg: #15202B;
     --bg-medium: #192734;
     --white: #FFFFFF;
     --gray: #7E868F;
     --input-color: #3D4E5E;
     --border-color: #444D55;
     --error-text-color: #FFD4E1;
  }

  html {
     font-size: 10px;
     box-sizing: border-box;
     background: var(--bg);
  }

  body {
    font-size: 1.6rem;
    color: var(--white);
    position: relative;
    font-family: 'Poppins', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Ubuntu, "Helvetica Neue", sans-serif;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .mapboxgl-popup {
    max-width: 31.5rem !important;
  }

  .mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip {
    border-top-color: #EBF0F5;
  }

  .mapboxgl-popup-content {
    background: #EBF0F5;
    box-shadow: 0 2px 6px rgba(0,0,0,.16);
    padding: 2rem;
    font-family: 'Poppins', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Ubuntu, "Helvetica Neue", sans-serif;

    p {
      font-size: 1.3rem;
      line-height: 1.2;
      color: var(--bg);
      margin: 0;
      margin-bottom: 1rem;
    }

    a {
      font-weight: 600;
      font-size: 1.4rem;
      text-transform: uppercase;
      color: var(--blue);
      letter-spacing: 0.05rem;
    }
  }
`;

export default GlobalStyles;
