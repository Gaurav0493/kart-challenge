import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
    it('renders modal with title and subtitle', () => {
        render(<Modal toggleModal={jest.fn()} />);
        expect(screen.getByText('Order Confirmed')).toBeInTheDocument();
        expect(screen.getByText('We hope you enjoy your food!')).toBeInTheDocument();
    });

    it('renders children inside modal', () => {
        render(
            <Modal toggleModal={jest.fn()}>
                <div data-testid="child">Child Content</div>
            </Modal>
        );
        expect(screen.getByTestId('child')).toHaveTextContent('Child Content');
    });

    it('calls toggleModal(false) when overlay is clicked', () => {
        const toggleModal = jest.fn();
        render(<Modal toggleModal={toggleModal} />);
        const overlay = screen.getByRole('dialog', { hidden: true }) || screen.getByClass('modal-overlay') || document.querySelector('.modal-overlay');
        fireEvent.click(overlay!);
        expect(toggleModal).toHaveBeenCalledWith(false);
    });

    it('does not call toggleModal when modal content is clicked', () => {
        const toggleModal = jest.fn();
        render(<Modal toggleModal={toggleModal} />);
        const content = document.querySelector('.modal-content');
        fireEvent.click(content!);
        expect(toggleModal).not.toHaveBeenCalled();
    });
});