import { IDSButtonGroup } from "@inera/ids-core/components/button-group/button-group-element.js";
import { IDSButton } from "@inera/ids-core/components/button/button-element.js";
import { IDSCard } from "@inera/ids-core/components/card/card-element.js";
import { IDSExpandable } from "@inera/ids-core/components/expandable/expandable-element.js";
import { IDSCheckboxGroup } from "@inera/ids-core/components/form/checkbox-group/checkbox-group-element";
import { IDSCheckbox } from "@inera/ids-core/components/form/checkbox/checkbox-element";
import { IDSErrorMessage } from "@inera/ids-core/components/form/error-message/error-message-element";
import { IDSInput } from "@inera/ids-core/components/form/input/input-element";
import { IDSTextarea } from "@inera/ids-core/components/form/textarea/textarea-element";
import { IDSIconLog } from "@inera/ids-core/components/icons/log/icon-log-element";
import "preact";

declare module "preact" {
  namespace JSX {
    import HTMLAttributes = JSX.HTMLAttributes;

    interface IntrinsicElements {
      "ids-button-group": HTMLAttributes<IDSButtonGroup>;
      "ids-button": HTMLAttributes<IDSButton>;
      "ids-card": HTMLAttributes<IDSCard>;
      "ids-checkbox-group": HTMLAttributes<IDSCheckboxGroup>;
      "ids-checkbox": HTMLAttributes<IDSCheckbox>;
      "ids-error-message": HTMLAttributes<IDSErrorMessage>;
      "ids-expandable": HTMLAttributes<IDSExpandable>;
      "ids-input": HTMLAttributes<IDSInput>;
      "ids-textarea": HTMLAttributes<IDSTextarea>;
      "ids-icon-log": HTMLAttributes<IDSIconLog>;
    }
  }
}
