import React, { useEffect} from "react";

//Packet
import { Modal, FormFeedback } from "reactstrap";
import { useForm } from 'react-hook-form';
import { isEmpty } from 'underscore';

//constant
import { replaceString } from "../../../utils/helpers";
import Message from "../../../constants/message";
import Validation from "../../../constants/validation";
import TypeCode from "../../../constants/typeCode";

export default function UserFillterComponent(props) {
    /**
     * get property
     */
    const { modal, toggle, _onSearch, parameterQuery, setParameterQuery } = props;

    const methods = useForm({
        mode: 'all',
        reValidateMode: 'all',
    });
    const { register, handleSubmit, getValues, setValue, formState: { errors } } = methods;

    /**
     * trim string
     * @param {*} name 
     * @param {*} value 
     */
    const _onBlur = (name, value) => {
        setValue(name, value.trim(), { shouldValidate: true });
    }

    /**
     * on submit
     */
    const _onSubmit = async() => {
        const params = {
            fullname: getValues('fullname'),
            role: parseInt(getValues('role', 10)),
            gender: parseInt(getValues('gender', 10)),
            room: parseInt(getValues('room', 10)),
            position: parseInt(getValues('position', 10)),
            experience: parseInt(getValues('experience', 10)),
            workform: parseInt(getValues('workform', 10))
        }

        const data = {}

        Object.entries(params).forEach(([key, value]) => {
            if ((value || value === 0) && value !== TypeCode.FILLTER.ALL) {
                data[key] = value;
            }
        });
        setParameterQuery(data);
        await _onSearch(data);
        toggle();
    }

    useEffect(()=> {
        if(!isEmpty(parameterQuery)){
            setValue('fullname', parameterQuery.fullname ? parameterQuery.fullname : '' );
            setValue('role', (parameterQuery.role || parameterQuery.role === TypeCode.USER.ROLE.STAFF) ? ''+parameterQuery.role : TypeCode.FILLTER.ALL);
            setValue('room', (parameterQuery.room || parameterQuery.room === TypeCode.USER.ROOM.OTHER) ? ''+parameterQuery.room : TypeCode.FILLTER.ALL);
            setValue('position', (parameterQuery.position || parameterQuery.position === TypeCode.USER.POSITION.OTHER) ? ''+parameterQuery.position : TypeCode.FILLTER.ALL);
            setValue('experience', (parameterQuery.experience || parameterQuery.experience === TypeCode.USER.EXPERIENCE.OTHER) ? ''+parameterQuery.experience : TypeCode.FILLTER.ALL);
            setValue('gender', (parameterQuery.gender || parameterQuery.gender === TypeCode.USER.GENDER.OTHER) ? ''+parameterQuery.gender : TypeCode.FILLTER.ALL);
            setValue('workform', (parameterQuery.workform || parameterQuery.workform === TypeCode.USER.WORKFORM.OTHER) ? ''+parameterQuery.workform : TypeCode.FILLTER.ALL);
        }
    }, []);

    /**
     * render template
     */
    return (
        <Modal
            isOpen={modal}
            className="modal-task-fillter">
            <section id="basic-vertical-layouts">
                <div className="row match-height">
                    <div className="col-md-12 col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">T??M KI???M NH??N VI??N</h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <form className="form form-vertical" onSubmit={handleSubmit(_onSubmit)}>
                                        <div className="form-body">
                                            <div className="row px-3 pb-3">
                                                <div className="col-xl-7 col-md-7 col-xs-7">
                                                    <h6>Nh??n vi??n :</h6>
                                                    <input
                                                        className="form-control 
                                                        form-control"
                                                        type="text"
                                                        placeholder="H??? v?? t??n"
                                                        {...register(
                                                            "fullname",
                                                            {
                                                                maxLength: {
                                                                    value: Validation.TEXT.MAX_LENGTH,
                                                                    message: replaceString(Message.TEXT.MAX_LENGTH, ["H??? v?? t??n", Validation.TEXT.MAX_LENGTH]),
                                                                },
                                                                minLength: {
                                                                    value: Validation.TEXT.MIN_LENGTH,
                                                                    message: replaceString(Message.TEXT.MIN_LENGTH, ["H??? v?? t??n", Validation.TEXT.MIN_LENGTH]),
                                                                },
                                                            }
                                                        )}
                                                        onBlur={(e) => { _onBlur(e.currentTarget.name, e.currentTarget.value) }}
                                                    />
                                                    {errors.fullname && (
                                                        <FormFeedback className="d-block">{errors.fullname.message}</FormFeedback>
                                                    )}
                                                </div>
                                                <div className="col-xl-5 col-md-5 col-xs-5">
                                                    <div className="form-group has-icon-left">
                                                        <label htmlFor="first-name-icon text-bold-500"><h6>Lo???i t??i kho???n :</h6></label>
                                                        <div className="position-relative">
                                                            <ul className="list-unstyled mb-0 pt-1">
                                                                <li className="d-inline-block me-5 mb-1">
                                                                    <div className="form-check">
                                                                        <div className="custom-control custom-checkbox">
                                                                            <input type="radio"
                                                                                className="form-check-input form-check-primary"
                                                                                id="administrator"
                                                                                value={TypeCode.USER.ROLE.ADMINISTRATOR}
                                                                                {...register(
                                                                                    "role",
                                                                                )} />
                                                                            <label className="form-check-label"
                                                                                htmlFor="administrator"><h6>Administrator</h6></label>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li className="d-inline-block me-5 mb-1">
                                                                    <div className="form-check">
                                                                        <div className="custom-control custom-checkbox">
                                                                            <input type="radio"
                                                                                className="form-check-input form-check-primary"
                                                                                id="staff"
                                                                                value={TypeCode.USER.ROLE.STAFF}
                                                                                {...register(
                                                                                    "role",
                                                                                )} />
                                                                            <label className="form-check-label"
                                                                                htmlFor="staff"><h6>Staff</h6></label>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li className="d-inline-block me-5 mb-1">
                                                                    <div className="form-check">
                                                                        <div className="custom-control custom-checkbox">
                                                                            <input type="radio"
                                                                                className="form-check-input form-check-primary"
                                                                                id="all"
                                                                                defaultChecked
                                                                                value={TypeCode.FILLTER.ALL}
                                                                                {...register(
                                                                                    "role",
                                                                                )} />
                                                                            <label className="form-check-label"
                                                                                htmlFor="all"><h6>T???t c???</h6></label>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row px-3 pb-3">
                                                <div className="col-xl-4 col-md-4 col-xs-4">
                                                    <h6>Ph??ng ban :</h6>
                                                    <select className="choices form-select"
                                                        {...register("room")}
                                                    >
                                                        <option value={TypeCode.FILLTER.ALL}>T???t c???</option>
                                                        <option value={TypeCode.USER.ROOM.OUTSOURCE}>{TypeCode.USER.ROOM_MAPPING[TypeCode.USER.ROOM.OUTSOURCE]}</option>
                                                        <option value={TypeCode.USER.ROOM.PRODUCT}>{TypeCode.USER.ROOM_MAPPING[TypeCode.USER.ROOM.PRODUCT]}</option>
                                                        <option value={TypeCode.USER.ROOM.OTHER}>{TypeCode.USER.ROOM_MAPPING[TypeCode.USER.ROOM.OTHER]}</option>
                                                    </select>
                                                </div>
                                                <div className="col-xl-4 col-md-4 col-xs-4">
                                                    <div className="form-group has-icon-left">
                                                        <label htmlFor="first-name-icon text-bold-500"><h6>Ch???c v??? :</h6></label>
                                                        <div className="position-relative">
                                                            <select className="choices form-select"
                                                                {...register("position")}
                                                            >
                                                                <option value={TypeCode.FILLTER.ALL}>T???t c???</option>
                                                                <option value={TypeCode.USER.POSITION.DEVELOPER}>{TypeCode.USER.POSITION_MAPPING[TypeCode.USER.POSITION.DEVELOPER]}</option>
                                                                <option value={TypeCode.USER.POSITION.TESTER}>{TypeCode.USER.POSITION_MAPPING[TypeCode.USER.POSITION.TESTER]}</option>
                                                                <option value={TypeCode.USER.POSITION.COMTOR}>{TypeCode.USER.POSITION_MAPPING[TypeCode.USER.POSITION.COMTOR]}</option>
                                                                <option value={TypeCode.USER.POSITION.BUSINESS_ANALYST}>{TypeCode.USER.POSITION_MAPPING[TypeCode.USER.POSITION.BUSINESS_ANALYST]}</option>
                                                                <option value={TypeCode.USER.POSITION.DESIGNER}>{TypeCode.USER.POSITION_MAPPING[TypeCode.USER.POSITION.DESIGNER]}</option>
                                                                <option value={TypeCode.USER.POSITION.OTHER}>{TypeCode.USER.POSITION_MAPPING[TypeCode.USER.POSITION.OTHER]}</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-4 col-md-4 col-xs-4">
                                                    <div className="form-group has-icon-left">
                                                        <label htmlFor="first-name-icon text-bold-500"><h6>Ch???c v??? kh??c :</h6></label>
                                                        <div className="position-relative">
                                                            <select className="choices form-select"
                                                                {...register("experience")}
                                                            >
                                                                <option value={TypeCode.FILLTER.ALL}>T???t c???</option>
                                                                <option value={TypeCode.USER.EXPERIENCE.STAFF}>{TypeCode.USER.EXPERIENCE_MAPPING[TypeCode.USER.EXPERIENCE.STAFF]}</option>
                                                                <option value={TypeCode.USER.EXPERIENCE.LEADER}>{TypeCode.USER.EXPERIENCE_MAPPING[TypeCode.USER.EXPERIENCE.LEADER]}</option>
                                                                <option value={TypeCode.USER.EXPERIENCE.PROJECT_MANAGER}>{TypeCode.USER.EXPERIENCE_MAPPING[TypeCode.USER.EXPERIENCE.PROJECT_MANAGER]}</option>
                                                                <option value={TypeCode.USER.EXPERIENCE.OTHER}>{TypeCode.USER.EXPERIENCE_MAPPING[TypeCode.USER.EXPERIENCE.OTHER]}</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row px-3 pb-3">
                                                <div className="col-xl-6 col-md-6 col-xs-6">
                                                    <div className="form-group has-icon-left">
                                                        <label htmlFor="first-name-icon text-bold-500"><h6>Gi???i t??nh :</h6></label>
                                                        <div className="position-relative">
                                                            <ul className="list-unstyled mb-0 pt-1">
                                                                <li className="d-inline-block me-5 mb-1">
                                                                    <div className="form-check">
                                                                        <div className="custom-control custom-checkbox">
                                                                            <input type="radio"
                                                                                className="form-check-input form-check-primary"
                                                                                id="male"
                                                                                value={TypeCode.USER.GENDER.MALE}
                                                                                {...register(
                                                                                    "gender",
                                                                                )} />
                                                                            <label className="form-check-label"
                                                                                htmlFor="male"><h6>Nam</h6></label>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li className="d-inline-block me-5 mb-1">
                                                                    <div className="form-check">
                                                                        <div className="custom-control custom-checkbox">
                                                                            <input type="radio"
                                                                                className="form-check-input form-check-primary"
                                                                                id="female"
                                                                                value={TypeCode.USER.GENDER.FEMALE}
                                                                                {...register(
                                                                                    "gender",
                                                                                )} />
                                                                            <label className="form-check-label"
                                                                                htmlFor="female"><h6>N???</h6></label>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li className="d-inline-block me-5 mb-1">
                                                                    <div className="form-check">
                                                                        <div className="custom-control custom-checkbox">
                                                                            <input type="radio"
                                                                                className="form-check-input form-check-primary"
                                                                                id="gender_other"
                                                                                value={TypeCode.USER.GENDER.OTHER}
                                                                                {...register(
                                                                                    "gender",
                                                                                )} />
                                                                            <label className="form-check-label"
                                                                                htmlFor="gender_other"><h6>Kh??c</h6></label>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li className="d-inline-block me-5 mb-1">
                                                                    <div className="form-check">
                                                                        <div className="custom-control custom-checkbox">
                                                                            <input type="radio"
                                                                                className="form-check-input form-check-primary"
                                                                                id="gender_all"
                                                                                value={TypeCode.FILLTER.ALL}
                                                                                defaultChecked
                                                                                {...register(
                                                                                    "gender",
                                                                                )}
                                                                            />
                                                                            <label className="form-check-label"
                                                                                htmlFor="gender_all"><h6>T???t c???</h6></label>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-md-6 col-xs-6">
                                                    <div className="form-group has-icon-left">
                                                        <label htmlFor="first-name-icon text-bold-500"><h6>H??nh th???c l??m vi???c :</h6></label>
                                                        <div className="position-relative">
                                                            <ul className="list-unstyled mb-0 pt-1">
                                                                <li className="d-inline-block me-5 mb-1">
                                                                    <div className="form-check">
                                                                        <div className="custom-control custom-checkbox">
                                                                            <input type="radio"
                                                                                className="form-check-input form-check-primary"
                                                                                id="fulltime"
                                                                                value={TypeCode.USER.WORKFORM.FULLTIME}
                                                                                {...register(
                                                                                    "workform",
                                                                                )} />
                                                                            <label className="form-check-label"
                                                                                htmlFor="fulltime"><h6>Fulltime</h6></label>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li className="d-inline-block me-5 mb-1">
                                                                    <div className="form-check">
                                                                        <div className="custom-control custom-checkbox">
                                                                            <input type="radio"
                                                                                className="form-check-input form-check-primary"
                                                                                id="parttime"
                                                                                value={TypeCode.USER.WORKFORM.PARTTIME}
                                                                                {...register(
                                                                                    "workform",
                                                                                )} />
                                                                            <label className="form-check-label"
                                                                                htmlFor="parttime"><h6>Parttime</h6></label>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li className="d-inline-block me-5 mb-1">
                                                                    <div className="form-check">
                                                                        <div className="custom-control custom-checkbox">
                                                                            <input type="radio"
                                                                                className="form-check-input form-check-primary"
                                                                                id="workform_other"
                                                                                value={TypeCode.USER.WORKFORM.OTHER}
                                                                                {...register(
                                                                                    "workform",
                                                                                )} />
                                                                            <label className="form-check-label"
                                                                                htmlFor="workform_other"><h6>Kh??c</h6></label>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li className="d-inline-block me-5 mb-1">
                                                                    <div className="form-check">
                                                                        <div className="custom-control custom-checkbox">
                                                                            <input type="radio"
                                                                                className="form-check-input form-check-primary"
                                                                                id="workform_all"
                                                                                value={TypeCode.FILLTER.ALL}
                                                                                defaultChecked
                                                                                {...register(
                                                                                    "workform",
                                                                                )} />
                                                                            <label className="form-check-label"
                                                                                htmlFor="workform_all"><h6>T???t c???</h6></label>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 d-flex justify-content-center">
                                                <button type="submit" className="btn btn-primary btn-sm me-3 mb-3 mt-3 btn-custom">T??m ki???m</button>
                                                <button
                                                    type="button"
                                                    className="btn btn-light-secondary btn-sm me-3 mb-3 mt-3 btn-custom"
                                                    onClick={toggle}
                                                >H???y</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Modal >
    );
}