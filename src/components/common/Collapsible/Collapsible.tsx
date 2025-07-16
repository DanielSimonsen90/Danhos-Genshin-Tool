import React, { forwardRef, useMemo, useState } from 'react';
import { CollapsibleProps } from './CollapsibleProps';
import './Collapsible.scss';
import { classNames } from '@/common/functions/strings';

const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(({ 
  title, titleOpen, 
  children, onOpen, 
  className,
  ...props
}, ref) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const open = props.open !== undefined ? props.open : internalOpen;
    const setOpen = props.setOpen !== undefined ? props.setOpen : setInternalOpen;
    
    const handleToggle = (newOpen: boolean) => {
      setOpen(newOpen);
      onOpen?.(newOpen);
    };

    const displayTitle = open && titleOpen ? titleOpen : title;

    return (
      <div ref={ref} className={classNames('collapsible', className, `collapsible--${open ? 'open' : 'closed'}`)}>
        <button
          type="button"
          className="collapsible__header"
          onClick={() => handleToggle(!open)}
          aria-expanded={open}
          aria-controls="collapsible-content"
        >
          <span className="collapsible__title">{displayTitle}</span>
          <span className={`collapsible__icon ${open ? 'open' : ''}`}>
            ▼
          </span>
        </button>
        
        <section
          className="collapsible__content"
          aria-hidden={!open}
        >
          {children}
        </section>
      </div>
    );
  }
);

Collapsible.displayName = 'Collapsible';

export default Collapsible;
