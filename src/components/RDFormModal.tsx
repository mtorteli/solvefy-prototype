import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface RDFormModalProps {
  open: boolean;
  onClose: () => void;
}

// Protótipo de portfólio: o formulário real do RD Station foi removido.
export const RDFormModal = ({ open, onClose }: RDFormModalProps) => {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md w-full p-0 overflow-hidden rounded-2xl">
        <DialogTitle className="sr-only">Formulário de Contato</DialogTitle>
        <div className="p-8 md:p-10 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary text-2xl">✦</div>
          <h2 className="text-xl font-bold mb-2">Protótipo de demonstração</h2>
          <p className="text-muted-foreground text-sm">
            Esta é uma tela de portfólio. O formulário de contato não está ativo aqui —
            nenhum dado é coletado ou enviado.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
