import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Icon from '../../../components/Icon/Icon';
import { selectChildren, fetchChildren, deleteChild, setChild, setIsNew, setSelectedChildId } from "../../../reducers/childrenReducer";
import { newChildModalToggle, } from "../../../reducers/uiSlice";
import AlertDialog from "../../AlertDialog";
import {
    StyledList,
    Item,
    Link,
    PaymentDue,
    ClientName,
    TotalPrice,
    DeleteButton,
    Image,
    Active,
    EmptyChildren
} from './ListStyles';

function List() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [delChildId, setDelChildId] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchChildren());
    }, [dispatch]);
    const children = useSelector(selectChildren);

    const isEmpty = children.length === 0;

    return (
        <>
            <AlertDialog
                open={isModalOpen}
                handleClose={(agree) => {
                    setIsModalOpen(false);
                    if (agree && delChildId !== '') {
                        dispatch(deleteChild(delChildId));
                        console.log(delChildId);
                    }
                }}
            />
            {isEmpty && (
                <EmptyChildren>
                    There is no Child. Please add new.
                </EmptyChildren>
            )}
            {!isEmpty && (
                <StyledList>
                    {children.map((item, index) => (
                        <Item
                            key={index}
                            layout
                        >
                            <Link onClick={(e) => {
                                dispatch(setChild(item));
                                dispatch(newChildModalToggle(true));
                                dispatch(setIsNew(false));
                                dispatch(setSelectedChildId(item._id));
                            }}>
                                <Image>
                                    <img
                                        style={{ height: '60px', width: '60px', borderRadius: '50%' }}
                                        src={item.profile}
                                    />
                                </Image>
                                <PaymentDue>
                                    {item.firstName}
                                </PaymentDue>
                                <ClientName>{item.parentName}</ClientName>
                                <TotalPrice>
                                    {item.birthday}
                                </TotalPrice>

                                <Active>{item.active ? 'Active' : 'Deactive'}</Active>

                                <DeleteButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsModalOpen(true);
                                        setDelChildId(item._id);
                                    }}
                                >
                                    <Icon
                                        name={'delete'}
                                        size={20}
                                        color="hsl(252, 94%, 67%)"
                                    />
                                </DeleteButton>

                            </Link>
                        </Item>
                    ))}
                </StyledList>
            )}
        </>

    )
}

export default List;