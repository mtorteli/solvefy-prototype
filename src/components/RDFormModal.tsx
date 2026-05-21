import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

const RD_FORM_ID = "contato-solvefy-com-58c21822e6ec437325ca";
const RD_SCRIPT_ID = "rd-station-forms-script";
const RD_SCRIPT_SRC =
  "https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js";

interface RDFormModalProps {
  open: boolean;
  onClose: () => void;
}

export const RDFormModal = ({ open, onClose }: RDFormModalProps) => {
  useEffect(() => {
    if (!open) return;

    const initForm = () => {
      // @ts-ignore
      new window.RDStationForms(RD_FORM_ID, "null").createForm();
    };

    const existing = document.getElementById(RD_SCRIPT_ID);
    if (existing) {
      initForm();
    } else {
      const script = document.createElement("script");
      script.id = RD_SCRIPT_ID;
      script.src = RD_SCRIPT_SRC;
      script.async = true;
      script.onload = initForm;
      document.body.appendChild(script);
    }

    return () => {
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
