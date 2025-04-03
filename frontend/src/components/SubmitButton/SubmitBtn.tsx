import c from "@/components/SubmitButton/submitBtn.module.css";

type SubmitBtnProps = {
  loading: boolean;
  text: string;
  loadingText: string;
};

export function SubmitBtn({ text, loadingText, loading }: SubmitBtnProps) {
  return (
    <button type="submit" className={c.button} disabled={loading}>
      {loading ? `${loadingText}` : `${text}`}
    </button>
  );
}
