import m from 'mithril';
import classnames from 'classnames';
import { Classes, IAttrs, ISizeAttrs, IIntentAttrs, updateElementGroupPadding } from '../../_shared';

export interface IInputAttrs extends IAttrs, ISizeAttrs, IIntentAttrs {
  /** Left-justified content */
  contentLeft?: m.Vnode;

  /** Right-justified content */
  contentRight?: m.Vnode;

  /** Initial value to display (uncontrolled mode) */
  defaultValue?: string;

  /** Disables input */
  disabled?: boolean;

  /** Fills width of parent container */
  fluid?: boolean;

  /** Callback invoked on value change */
  onchange?: (e: Event) => void;

  /** Input value */
  value?: string | number;

  [htmlAttrs: string]: any;
}

export class Input implements m.Component<IInputAttrs> {
  public oncreate(vnode: m.VnodeDOM<IInputAttrs>) {
    this.updatePadding(vnode);
  }

  public onupdate(vnode: m.VnodeDOM<IInputAttrs>) {
    this.updatePadding(vnode);
  }

  public view({ attrs }: m.Vnode<IInputAttrs>) {
    const {
      class: className,
      contentLeft,
      contentRight,
      disabled,
      fluid,
      intent,
      size,
      style,
      ...htmlAttrs
    } = attrs;

    const classes = classnames(
      Classes.INPUT,
      disabled && Classes.DISABLED,
      fluid && Classes.FLUID,
      intent && `cui-${intent}`,
      size && `cui-${size}`,
      className
    );

    const input = m('input', { ...htmlAttrs });

    return m('', { class: classes, style }, [
      contentLeft,
      input,
      contentRight
    ]);
  }

  private updatePadding({ attrs, dom }: m.VnodeDOM<IInputAttrs>) {
    const containerEl = dom.querySelector('input') as HTMLElement;
    updateElementGroupPadding(containerEl, attrs.contentLeft, attrs.contentRight);
  }
}
