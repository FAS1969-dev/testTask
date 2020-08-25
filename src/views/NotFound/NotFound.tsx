/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */
import React from 'react';

export default function NotFound(): JSX.Element {
  return (
    <article className="notFound">
      <h1>Page not found.</h1>
    </article>
  );
}
