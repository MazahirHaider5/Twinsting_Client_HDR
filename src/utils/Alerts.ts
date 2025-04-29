import Swal, { SweetAlertIcon, SweetAlertResult } from "sweetalert2";

export const showAlert = (
  message: string,
  showIcon: SweetAlertIcon,
  cancelBtn?: boolean,
  title?: string
): Promise<SweetAlertResult> => {
  return Swal.fire({
    title: title ?? undefined,
    text: message,
    icon: showIcon,
    confirmButtonColor: "#ca2d2c",
    confirmButtonText: "Ok",
    showCancelButton: cancelBtn ?? false
  });
};

export const showToast = (
  message: string,
  showIcon: SweetAlertIcon,
  position:
    | "top"
    | "top-start"
    | "top-end"
    | "center"
    | "center-start"
    | "center-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
): void => {
  const Toast = Swal.mixin({
    toast: true,
    width: 500,
    position,
    showConfirmButton: false,
    timer: 2500,
    customClass: {
      container: "custom-toast-container"
    },
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    }
  });

  Toast.fire({
    icon: showIcon,
    title: message
  });
};

export const showConfirmationAlert = async (
  message: string,
  showIcon: SweetAlertIcon,
  confirmBtnText?: string,
  rejectBtnText?: string,
  rejection?: boolean
): Promise<SweetAlertResult> => {
  return await Swal.fire({
    html: rejection ? `<div class="text-start"><b>Reason for rejection:</b> ${message}</div>` : message,
    icon: showIcon,
    showCancelButton: true,
    confirmButtonColor: "red",
    cancelButtonColor: "#7e8299",
    cancelButtonText: rejectBtnText ?? "Cancel",
    confirmButtonText: confirmBtnText ?? "Yes",
    reverseButtons: true,
    allowOutsideClick: false,
    showClass: {
      popup: "swal2-noanimation",
      backdrop: "swal2-noanimation",
      icon: "swal2-noanimation"
    },
    hideClass: {
      popup: "",
      backdrop: "",
      icon: ""
    }
  });
};

export const showConfirmationModal = async (
  message: string,
  showIcon: SweetAlertIcon,
  confirmBtnText?: string,
  rejectBtnText?: string,
  reason?: string,
  deactivatedBy?: string
): Promise<SweetAlertResult> => {
  return await Swal.fire({
    html: reason
      ? `<div class="text-start">${message}</div>
         <div class="my-2 text-start"><b>Reason:</b> ${reason ?? "N/A"}</div>
         ${
           deactivatedBy === "Shadi.Pk"
             ? `<div class="text-start">
                You are given warning, next time follow the company policies and terms of service. Otherwise your account will be permanently deactivated/deleted.
                </div>`
             : ""
         }
         <div class="text-start mt-2 pt-1">Would you like to reactivate it now?</div>`
      : message,
    icon: showIcon,
    showCancelButton: true,
    confirmButtonColor: "#ca2d2c",
    cancelButtonColor: "#7e8299",
    cancelButtonText: rejectBtnText ?? "Cancel",
    confirmButtonText: confirmBtnText ?? "Yes",
    reverseButtons: true,
    allowOutsideClick: false,
    showClass: {
      popup: "swal2-noanimation",
      backdrop: "swal2-noanimation",
      icon: "swal2-noanimation"
    },
    hideClass: {
      popup: "",
      backdrop: "",
      icon: ""
    }
  });
};
