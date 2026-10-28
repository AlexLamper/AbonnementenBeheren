"use client";

import type { ClientSubscription } from "@/lib/types";
import type { SubscriptionInput } from "@/lib/validation";
import { Modal } from "@/components/Modal";
import { SubscriptionForm } from "@/components/SubscriptionForm";
import { ServiceLogo } from "@/components/ServiceLogo";

export function EditSubscriptionDialog({
  subscription,
  onClose,
  onSave,
}: {
  subscription: ClientSubscription | null;
  onClose: () => void;
  onSave: (id: string, input: SubscriptionInput) => Promise<boolean>;
}) {
  return (
    <Modal
      open={!!subscription}
      onClose={onClose}
      title="Abonnement bewerken"
      icon={
        subscription && (
          <ServiceLogo
            name={subscription.name}
            presetId={subscription.presetId}
            logoUrl={subscription.logoUrl}
            color={subscription.color}
            size={40}
          />
        )
      }
    >
      {subscription && (
        <SubscriptionForm
          initial={subscription}
          submitLabel="Opslaan"
          onSubmit={async (input) => {
            const ok = await onSave(subscription.id, input);
            if (ok) onClose();
            return ok;
          }}
        />
      )}
    </Modal>
  );
}
