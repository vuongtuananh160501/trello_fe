import { useState, useEffect } from "react";

//icon
import { RiDeleteBin5Fill } from "react-icons/ri";

//lottie
import Lottie from 'react-lottie';
import add from '../../../assets/lottie/add.json';

//packet
import { useFormContext } from 'react-hook-form';


//constant
import Common from "../../../constants/common";
import TypeCode from "../../../constants/typeCode";
import { filterUserFromExceptId, findFromId, filterUserMember } from "../../../utils/helpers";

export default function MemberComponent(props) {

    const { usersMemberList, userSelectedList, setUserSelectedList  } = props;
    const { register, watch } = useFormContext();
    const [userMemberList, setUserMemberList] = useState([]);

    const defaultOptions = {
        loop: true,
        autoplay: false,
        animationData: add,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    let watchPosition = watch('position');

    /**
     * 
     */
    const _onSelected = (id) => {
        setUserSelectedList(oldArrUserSelected => [...oldArrUserSelected, findFromId(userMemberList, id)]);
        setUserMemberList(filterUserFromExceptId(userMemberList, id));
    }

    /**
     * reset user list
     */
    const _onReset = () => {
        setUserSelectedList([]);
        setUserMemberList(usersMemberList);
    }

    /**
     * remove user list
     */
    const _onRemove = (id) => {
        setUserMemberList(oldArrUserFillter => [...oldArrUserFillter, findFromId(userSelectedList, id)]);
        setUserSelectedList(filterUserFromExceptId(userSelectedList, id));
    }

    /**
     * filter user list
     */
    const _onFillter = (conditionList) => {
        const userIdSelectedList = [];
        userSelectedList.forEach((item) => {
            userIdSelectedList.push(item._id);
        })
        setUserMemberList(filterUserMember(usersMemberList,userIdSelectedList,conditionList));
    }

    useEffect(() => {
        _onFillter(watchPosition);
    },[watchPosition]);

    useEffect(()=>{
        if(usersMemberList){
            setUserMemberList(usersMemberList);
        }
    },[usersMemberList]);

    /**
     * render template
     */
    return (
        <div className="row">
            <section className="tasks">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="card widget-todo">
                            <div className="border-bottom">
                                <h4 className="card-title d-flex">
                                    <i className="bx bx-check font-medium-5 pl-25 pr-75" />
                                    Th??nh vi??n
                                </h4>
                                <div className="row mt-3">
                                    <div className="col-lg-12">
                                        <ul className="list-unstyled mb-0 d-flex justify-content-around">
                                            <li className="d-inline-block me-2 mb-1">
                                                <div className="form-check">
                                                    <div className="custom-control custom-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input form-check-primary"
                                                            id="developer"
                                                            defaultChecked
                                                            value={TypeCode.USER.POSITION.DEVELOPER}
                                                            {...register(
                                                                "position",
                                                            )}
                                                        />
                                                        <label className="form-check-label" htmlFor="developer">
                                                            <h6>{TypeCode.USER.POSITION_MAPPING[1]}</h6>
                                                        </label>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="d-inline-block me-2 mb-1">
                                                <div className="form-check">
                                                    <div className="custom-control custom-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input form-check-primary"
                                                            id="tester"
                                                            defaultChecked
                                                            value={TypeCode.USER.POSITION.TESTER}
                                                            {...register(
                                                                "position",
                                                            )}
                                                        />
                                                        <label className="form-check-label" htmlFor="tester">
                                                            <h6>{TypeCode.USER.POSITION_MAPPING[2]}</h6>
                                                        </label>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="d-inline-block me-2 mb-1">
                                                <div className="form-check">
                                                    <div className="custom-control custom-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input form-check-primary"
                                                            id="ba"
                                                            defaultChecked
                                                            value={TypeCode.USER.POSITION.BUSINESS_ANALYST}
                                                            {...register(
                                                                "position",
                                                            )}
                                                        />
                                                        <label className="form-check-label" htmlFor="ba">
                                                            <h6>{TypeCode.USER.POSITION_MAPPING[3]}</h6>
                                                        </label>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="d-inline-block me-2 mb-1">
                                                <div className="form-check">
                                                    <div className="custom-control custom-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input form-check-primary"
                                                            id="designer"
                                                            defaultChecked
                                                            value={TypeCode.USER.POSITION.DESIGNER}
                                                            {...register(
                                                                "position",
                                                            )}
                                                        />
                                                        <label className="form-check-label" htmlFor="designer">
                                                            <h6>{TypeCode.USER.POSITION_MAPPING[4]}</h6>
                                                        </label>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="d-inline-block me-2 mb-1">
                                                <div className="form-check">
                                                    <div className="custom-control custom-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input form-check-primary"
                                                            id="comtor"
                                                            defaultChecked
                                                            value={TypeCode.USER.POSITION.COMTOR}
                                                            {...register(
                                                                "position",
                                                            )}
                                                        />
                                                        <label className="form-check-label" htmlFor="comtor">
                                                            <h6>{TypeCode.USER.POSITION_MAPPING[5]}</h6>
                                                        </label>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="d-inline-block mb-1">
                                                <div className="form-check">
                                                    <div className="custom-control custom-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input form-check-primary"
                                                            id="other"
                                                            defaultChecked
                                                            value={TypeCode.USER.POSITION.OTHER}
                                                            {...register(
                                                                "position",
                                                            )}
                                                        />
                                                        <label className="form-check-label" htmlFor="other">
                                                            <h6>{TypeCode.USER.POSITION_MAPPING[0]}</h6>
                                                        </label>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body px-0 py-1 widget-todo-right">
                                <ul className="widget-todo-list-wrapper" id="widget-todo-list">
                                    {
                                        userMemberList.length > 0 && userMemberList.map((item, idx) => (
                                            <li className="widget-todo-item mt-2" key={idx}>
                                                <div className="widget-todo-title-wrapper d-flex justify-content-start align-items-center mb-2">
                                                    <div className="widget-todo-title-area d-flex align-items-center">
                                                        <div onClick={() => _onSelected(item._id)} className="checkbox checkbox-shadow">
                                                            <Lottie options={defaultOptions}
                                                                height={35}
                                                                width={35} />
                                                        </div>
                                                        <div className="widget-todo-item-action d-flex align-items-center px-3">
                                                            <div className="avatar bg-warning">
                                                                <img src={Common.ENV + item.avatar} alt="" srcSet="" />
                                                            </div>
                                                        </div>
                                                        <span className="widget-todo-title px-3">
                                                            <span className="item-fullname">{item.fullname}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    }
                                    {
                                        userMemberList.length <= 0 &&
                                        <div className="text-center mt-5">
                                            <h6>Kh??ng c?? th??ng tin vui l??ng ch???n !</h6>
                                        </div>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card widget-todo">
                            <div className="border-bottom">
                                <h4 className="card-title d-flex">
                                    <i className="bx bx-check font-medium-5 pl-25 pr-75" />
                                    Th??nh vi??n ???????c ch???n
                                </h4>
                                <div className="row mt-3 d-flex justify-content-end">
                                    <button type="button" onClick={_onReset} className="btn btn-secondary btn-sm me-3 mb-1 btn-custom">?????t l???i</button>
                                </div>
                            </div>
                            <div className="card-body px-0 py-1 widget-todo-left">
                                <ul className="widget-todo-list-wrapper" id="widget-todo-list">
                                    {
                                        userSelectedList.length > 0 && userSelectedList.map((item, idx) => (
                                            <li className="widget-todo-item mt-2" key={idx}>
                                                <div className="widget-todo-title-wrapper d-flex justify-content-start align-items-center mb-2">
                                                    <div className="widget-todo-title-area d-flex align-items-center">
                                                        <div className="widget-todo-item-action d-flex align-items-center">
                                                            <div className="avatar bg-warning">
                                                                <img src={Common.ENV + item.avatar} alt="" srcSet="" />
                                                            </div>
                                                        </div>
                                                        <span className="widget-todo-title px-3">
                                                            <span className="item-fullname">{item.fullname}</span>
                                                        </span>
                                                        <RiDeleteBin5Fill className="cursor-pointer" onClick={()=>_onRemove(item._id)}/>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    }
                                    {
                                        userSelectedList.length <= 0 &&
                                        <div className="text-center mt-5">
                                            <h6>Kh??ng c?? th??ng tin vui l??ng ch???n !</h6>
                                        </div>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}