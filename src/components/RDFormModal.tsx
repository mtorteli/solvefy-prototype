import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  RD_FORM_ID,
  RD_SCRIPT_ID,
  RD_SCRIPT_SRC,
  useRdStationForm,
} from "@/lib/rdStation";

export { RD_FORM_ID, RD_SCRIPT_ID, RD_SCRIPT_SRC };

interface RDFormModalProps {
  open: boolean;
  onClose: () => void;
}

export const RDFormModal = ({ open, onClose }: RDFormModalProps) => {
  useRdStationForm(open);

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
