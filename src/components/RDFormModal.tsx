import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

export const RD_FORM_ID = "contato-solvefy-com-58c21822e6ec437325ca";
export const RD_SCRIPT_ID = "rd-station-forms-script";
export const RD_SCRIPT_SRC =
  "https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js";

interface RDFormModalProps {
  open: boolean;
  onClose: () => void;
}

export const RDFormModal = ({ open, onClose }: RDFormModalProps) => {
  useEffect(() => {
    if (!open) return;

    let retryId: ReturnType<typeof setTimeout>;

    const tryInit = () => {
      // @ts-ignore
      if (typeof window.RDStationForms === "undefined") {
        // Script ainda carregando — tenta novamente em 100 ms
        retryId = setTimeout(tryInit, 100);
        return;
      }

      const container = document.getElementById(RD_FORM_ID);
      if (!container) {
        retryId = setTimeout(tryInit, 100);
        return;
      }

      container.innerHTML = "";
      // @ts-ignore
      new window.RDStationForms(RD_FORM_ID, "null").createForm();
    };

    tryInit();

    return () => {
      clearTimeout(retryId);
      const container = document.getElementById(RD_FORM_ID);
      if (container) container.innerHTML = "";
    };
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-xl w-full p-0 overflow-hidden rounded-2xl">
        <DialogTitle className="sr-only">Formulário de Contato</DialogTitle>
        <div className="overflow-y-auto max-h-[90vh] p-6 md:p-10">
          <div role="main" id={RD_FORM_ID} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
