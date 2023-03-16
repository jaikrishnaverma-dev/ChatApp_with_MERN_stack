import React, { useEffect, useState } from "react";
// toasts=> [{title,time,msg,status}]
const Toasts = ({ toasts }) => {
  const [active, setActive] = useState(
    toasts.map((x) => {
      return { ...x, show: true };
    })
  );
  useEffect(() => {
    setActive(
      toasts.map((x) => {
        return { ...x, show: true };
      })
    );
    setTimeout(() => {
      setActive([]);
    }, 4000);
  }, [toasts]);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{ position: "fixed",  top: "20px",zIndex:'10000000',
      right: "20px",}}
    >
      {/* <!-- Position it --> */}
      <div
      >
        {/* <!-- Then put toasts within --> */}
        {active.map((x, i) => (
          <>
            <div
              className={`toast ${x.show ? "show" : ""}`}
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <div className="toast-header d-flex justify-content-between">
                <div className="one">
                  <button
                    className={`btn btn-${
                      x.status ? x.status : ""
                    } px-3  border-0`}
                  ></button>
                  <strong className="mr-auto mx-2">{x.title ? x.title : ""}</strong>
                </div>
                <div className="two">
                  <small className="text-muted mx-2">{x.time ? x.time : ""}</small>
                  <button
                    type="button"
                    className="btn text-primary fs-4 p-0"
                    data-dismiss="toast"
                    aria-label="Close"
                    onClick={() => {
                      active.splice(i, 1);
                      setActive([...active]);
                    }}
                  >
                    <i className="bi bi-x-circle-fill"></i>
                  </button>
                </div>
              </div>
              <div className="toast-body">{x.msg ? x.msg : ""}</div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Toasts;
