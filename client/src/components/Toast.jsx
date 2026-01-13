// src/components/Toast.jsx
const Toast = ({ message, type = "success" }) => {
  if (!message) return null;

  return (
    <div className="toast toast-top toast-end mt-16 z-[999]">
      <div className={`alert ${type === "error" ? "alert-error" : "alert-success"} text-white shadow-lg`}>
        <div className="flex items-center gap-2">
          {type === "error" ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          )}
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
};

export default Toast;