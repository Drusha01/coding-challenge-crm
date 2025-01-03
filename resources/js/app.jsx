import './bootstrap';
import 'flowbite';

import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx')
    return pages[`./Pages/${name}.jsx`]()
  },
  setup({ el, App, props }) {
    createRoot(el).render(
        <App {...props} />
    )
  },
  title: title => `Coding Challege CRM - ${title}`,
})
