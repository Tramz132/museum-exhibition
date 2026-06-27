import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { AlertCircle } from 'lucide-react';

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Konfirmasi Tindakan',
  message = 'Apakah Anda yakin ingin melakukan tindakan ini?',
  confirmText = 'Ya, Lanjutkan',
  cancelText = 'Batal',
  variant = 'danger', // danger | warning | primary
  ...props
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} className="max-w-md" {...props}>
      <div className="space-y-5 text-left">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
            variant === 'danger' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' :
            variant === 'warning' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
            'bg-blue-500/10 text-blue-500 border border-blue-500/20'
          }`}>
            <AlertCircle className="h-5 w-5" />
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {message}
          </p>
        </div>

        <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-800/80">
          <Button variant="secondary" onClick={onClose} size="sm">
            {cancelText}
          </Button>
          <Button variant={variant} onClick={onConfirm} size="sm">
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
