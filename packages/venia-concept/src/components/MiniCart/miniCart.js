import React from 'react';
import { bool, func, shape, string } from 'prop-types';

import { useWindowSize } from '@magento/peregrine';

import Body from './body';
import Footer from './footer';
import Header from './header';
import Mask from './mask';

import { mergeClasses } from 'src/classify';
import defaultClasses from './miniCart.css';

const MiniCart = props => {
    // Props.
    const {
        beginEditItem,
        cancelCheckout,
        cart,
        closeDrawer,
        endEditItem,
        isCartEmpty,
        isMiniCartMaskOpen,
        isOpen,
        removeItemFromCart,
        updateItemInCart
    } = props;
    const { isEditingItem, isLoading } = cart;

    // Hooks.
    const { innerHeight: viewportHeight } = useWindowSize();

    // Members.
    const classes = mergeClasses(defaultClasses, props.classes);
    const rootClass = isOpen ? classes.root_open : classes.root;
    const rootStyle = {
        '--minicart-height-unit': `${viewportHeight * 0.01}px`
    };

    const showFooter = !(isCartEmpty || isLoading || isEditingItem);
    const footer = showFooter ? (
        <Footer cart={cart} isMiniCartMaskOpen={isMiniCartMaskOpen} />
    ) : null;

    return (
        <aside className={rootClass} style={rootStyle}>
            <Header closeDrawer={closeDrawer} isEditingItem={isEditingItem} />
            <Body
                beginEditItem={beginEditItem}
                cart={cart}
                closeDrawer={closeDrawer}
                endEditItem={endEditItem}
                isCartEmpty={isCartEmpty}
                removeItemFromCart={removeItemFromCart}
                updateItemInCart={updateItemInCart}
            />
            <Mask isActive={isMiniCartMaskOpen} dismiss={cancelCheckout} />
            {footer}
        </aside>
    );
};

MiniCart.propTypes = {
    beginEditItem: func.isRequired,
    cancelCheckout: func,
    cart: shape({
        isEditingItem: bool,
        isLoading: bool
    }).isRequired,
    classes: shape({
        header: string,
        root: string,
        root_open: string,
        title: string
    }),
    closeDrawer: func,
    endEditItem: func.isRequired,
    isCartEmpty: bool,
    isMiniCartMaskOpen: bool,
    isOpen: bool,
    removeItemFromCart: func,
    updateItemInCart: func
};

export default MiniCart;
