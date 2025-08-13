import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Breadcrumbs from './Breadcrumbs';


vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('Breadcrumbs', () => {
  it('renders single breadcrumb item without link', () => {
    const items = [{ label: 'Home' }];
    render(<Breadcrumbs items={items} />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders multiple breadcrumb items with links', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Details' }
    ];
    
    render(<Breadcrumbs items={items} />);
    

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();

    const homeLink = screen.getByRole('link', { name: 'Home' });
    const productsLink = screen.getByRole('link', { name: 'Products' });
    
    expect(homeLink).toHaveAttribute('href', '/');
    expect(productsLink).toHaveAttribute('href', '/products');
    

    expect(screen.getByText('Details').closest('a')).toBeNull();
  });

  it('renders separators between items', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Products' }
    ];
    
    render(<Breadcrumbs items={items} />);
    

    const separators = screen.getByRole('navigation').querySelectorAll('svg');
    expect(separators).toHaveLength(1);
  });

  it('handles empty items array', () => {
    const { container } = render(<Breadcrumbs items={[]} />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it('applies correct styling to last item', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Current' }
    ];
    
    render(<Breadcrumbs items={items} />);
    
    const currentItem = screen.getByText('Current');
    expect(currentItem).toHaveClass('text-primary-violet', 'font-medium');
  });
});