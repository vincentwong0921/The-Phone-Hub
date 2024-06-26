import './Cart.css'
import { editItemInCart, deleteCartItem } from '../../store/cartItem'
import { useDispatch } from 'react-redux';
import { getUserCartItems } from '../../store/cartItem';
import { getAllInventory } from '../../store/inventory';

function Cart({cartItems}) {
    const dispatch = useDispatch()
    let total = 0
    cartItems.forEach(item => total += item.Inventory?.price * item.quantity)

    const addOne = async (itemId, quantity) => {
        await dispatch(editItemInCart({id: itemId, quantity: quantity + 1}))
        await dispatch(getUserCartItems())
        await dispatch(getAllInventory())
    }
    const minusOne =  async (itemId, quantity) => {
        await dispatch(editItemInCart({id: itemId, quantity: quantity - 1}))
        await dispatch(getUserCartItems())
        await dispatch(getAllInventory())
    }
    const deleteItem = async (itemId) => {
        await dispatch(deleteCartItem(itemId))
        await dispatch(getUserCartItems())
        await dispatch(getAllInventory())
    }

    if(!cartItems.length) {
        return (
            <a href='/products'>Continue Shopping!</a>
        )
    } else {
        return (
            <>
                <div className='CartTitle'>
                    <h1>Shopping Cart</h1>
                </div>
                <div className='CartItemContainer'>
                    {cartItems && cartItems.map(item =>
                        <div key={item.id} className='CartItemDetailContainer'>
                            {item.quantity > 1 ? <i onClick={() => minusOne(item.id, item.quantity)} className="fa-solid fa-minus"></i> : <i onClick={() => deleteItem(item.id)} className="fa-solid fa-trash"></i>}
                            <p>{item.quantity} x {' '}{item.Inventory?.model} {' '}{item.Inventory?.storage}</p>
                            {item.Inventory?.available_units > 0 ?
                            <i onClick={() => addOne(item.id, item.quantity)} className="fa-solid fa-plus"></i>
                            : null}

                            <img className='CartItemImage' src={item.Inventory?.image_url}></img>
                            <p>${item.Inventory?.price}</p>
                        </div>
                    )}
                </div>
                <div className='TotalAndCheckOut'>
                    <p className='Total'>Subtotal: ${total.toFixed(2)}</p>
                    <a href='/checkout'>Check out</a>
                </div>
            </>
        )
    }
}

export default Cart
