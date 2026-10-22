'use client';
import Link from 'next/link';
import { useInsertionEffect } from 'react';

/** Truthiness used by the templates: false, 'false', '', 0, null and undefined are off. */
export const __b = (x) => !(x === false || x === 'false' || x === '' || x === 0 || x == null || Number.isNaN(x));

/** Text for interpolation: drops null, undefined and booleans. */
export const __t = (x) => (x == null || x === false || x === true ? '' : x);

/** Internal links use Next's client-side navigation; everything else is a normal <a>. */
export function A({ href, children, ...rest }) {
  if (typeof href === 'string' && href.startsWith('/') && !href.startsWith('//')) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}

/**
 * Each screen ships its own CSS (hover states, mobile breakpoints). It is added to
 * <head> while the screen is on the page and removed when the last copy unmounts.
 */
const styleCounts = {};
export function withDCStyle(Component, name, css) {
  function Styled(props) {
    useInsertionEffect(() => {
      if (!css) return undefined;
      const id = 'dc-style-' + name;
      styleCounts[id] = (styleCounts[id] || 0) + 1;
      let el = document.getElementById(id);
      if (!el) {
        el = document.createElement('style');
        el.id = id;
        el.textContent = css;
        document.head.appendChild(el);
      }
      return () => {
        styleCounts[id] -= 1;
        if (styleCounts[id] <= 0) {
          delete styleCounts[id];
          el.remove();
        }
      };
    }, []);
    return <Component {...props} />;
  }
  Styled.displayName = name;
  return Styled;
}
