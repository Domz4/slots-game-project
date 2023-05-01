import { useRouteError } from "react-router-dom";
import styles from "./styles.module.css";

interface RouteError {
  statusText?: string;
  message?: string;
}

function isRouteError(obj: unknown): obj is RouteError {
  return typeof obj === "object" && obj !== null && ("statusText" in obj || "message" in obj);
}

const ErrorPage = () => {
  const unknownError = useRouteError();
  const error: RouteError = isRouteError(unknownError)
    ? (unknownError as RouteError)
    : { message: "An unknown error occurred." };
  return (
    <div className={styles.errorPage}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
