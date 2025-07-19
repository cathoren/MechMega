
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface PriceBreakdown {
  materialCost: number;
  printingCost: number;
  finishingCost: number;
  total: number;
}

interface PriceBreakdownDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  priceBreakdown: PriceBreakdown | null;
}

const PriceBreakdownDialog: React.FC<PriceBreakdownDialogProps> = ({
  open,
  onOpenChange,
  priceBreakdown
}) => {
  if (!priceBreakdown) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">Price Breakdown</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-muted-foreground">Material Cost</Label>
              <p className="text-lg font-semibold text-foreground">₹{priceBreakdown.materialCost.toFixed(2)}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Printing Cost</Label>
              <p className="text-lg font-semibold text-foreground">₹{priceBreakdown.printingCost.toFixed(2)}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Finishing Cost</Label>
              <p className="text-lg font-semibold text-foreground">₹{priceBreakdown.finishingCost.toFixed(2)}</p>
            </div>
            <div className="col-span-2 pt-2 border-t border-border">
              <Label className="text-sm text-muted-foreground">Total Amount</Label>
              <p className="text-2xl font-bold text-primary">₹{priceBreakdown.total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PriceBreakdownDialog;
