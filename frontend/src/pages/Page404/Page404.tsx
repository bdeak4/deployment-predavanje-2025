import { useNavigate } from "react-router";
import c from "./page404.module.css";
import { paths } from "@/router/paths";
import pageNotFoundSvg from "@/assets/svgs/404Icon.svg";
export function Page404() {
  const navigate = useNavigate();

  return (
    <div className={`header container ${c.pageWrapper}`}>
      <div className={c.feedbackWrapper}>
        <button className={c.goHomeBtn} onClick={() => navigate(paths.home)}>
          Go to home page
        </button>
        <h1>
          Page not found. <br /> Error 404
        </h1>
      </div>

      <img src={pageNotFoundSvg} alt="Page not found illustration" />
    </div>
  );
}
