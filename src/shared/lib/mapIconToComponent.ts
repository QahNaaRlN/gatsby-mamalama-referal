import { ReactComponent as JacketIcon } from "@shared/assets/icons/jacket.svg";
import { ReactComponent as LinenIcon } from "@shared/assets/icons/linen.svg";
import { ReactComponent as LogoFooterIcon } from "@shared/assets/icons/logo-footer.svg";
import { ReactComponent as LogoHeaderIcon } from "@shared/assets/icons/logo-header.svg";
import { ReactComponent as PhoneIcon } from "@shared/assets/icons/phone.svg";
import { ReactComponent as TShirtIcon } from "@shared/assets/icons/t-shirt.svg";
import { ReactComponent as TelegramIcon } from "@shared/assets/icons/tg.svg";
import { ReactComponent as TowelIcon } from "@shared/assets/icons/towel.svg";
import { ReactComponent as WashingMachineIcon } from "@shared/assets/icons/washing-machine.svg";
import { ReactComponent as WhatsAppIcon } from "@shared/assets/icons/whatsapp.svg";

/**
 * Map of local icon names to their corresponding React components.
 */
export const localIconMap = {
  phone: PhoneIcon,
  telegram: TelegramIcon,
  jacket: JacketIcon,
  linen: LinenIcon,
  logoFooter: LogoFooterIcon,
  logoHeader: LogoHeaderIcon,
  tShirt: TShirtIcon,
  towel: TowelIcon,
  washingMachine: WashingMachineIcon,
  whatsApp: WhatsAppIcon,
} as const;