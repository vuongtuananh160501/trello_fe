import { useState, useEffect } from 'react';

//constant
import Common from "../../../constants/common";
import { getTokenFromLocalStorage, getUserDataFromLocalStorage } from "../../../utils/utils";
import LinkName from "../../../constants/linkName";
import TypeCode from './../../../constants/typeCode';
import Message from './../../../constants/message';
import Validation from "../../../constants/validation";
import { replaceString } from './../../../utils/helpers';

//packet
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { FormFeedback } from 'reactstrap';

//api
import taskApi from './../../../api/taskApi';
import projectApi from './../../../api/projectApi';

//component
import ModalErrorComponent from "../../../components/Modal/ModalError/ModalError";
import ModalSuccessComponent from "../../../components/Modal/ModalSuccess/ModalSuccess";

export default function TaskCreateScreen() {

    let navigate = useNavigate();
    const token = getTokenFromLocalStorage();

    const methods = useForm({
        mode: 'all',
        reValidateMode: 'all',
    });
    const { register, handleSubmit, getValues, watch, setValue, formState: { errors } } = methods;

    const [modalSuccess, setModalSuccess] = useState(false);
    const toggleModalSuccess = () => {
        setModalSuccess(!modalSuccess);
    }

    const [projectList, setProjectList] = useState([]);
    const [userData, setUserData] = useState({});

    const [modalError, setModalError] = useState(false);
    const toggleModalError = () => {
        setModalError(!modalError);
    }
    const [message, setMessage] = useState('');

    const [taskCategoryList, setTaskCategoryList] = useState([]);
    const [taskStatusList, setTaskStatusList] = useState([]);
    const [taskMemberList, setTaskMemberList] = useState([]);
    const [taskParentList, setTaskParentList] = useState([]);
    const [files, setFiles] = useState(null);

    /**
     * trim string
     * @param {*} name 
     * @param {*} value 
     */
    const _onBlur = (name, value) => {
        setValue(name, value.trim(), { shouldValidate: true });
    }

    /**
     * on change file
     * @param {*} e 
     */
    const _onChangeFile = (e) => {
        setFiles(e.target.files);
    }

    /**
     * 
     * @param {*} get list project
     */

    const _getProjectList = () => {
        projectApi.list().then(
            (response) => {
                if (response.status === Common.HTTP_STATUS.OK) {
                    setProjectList(response.data.projects);
                    _onDetail(response.data.projects[0]?._id);
                    _getParentTask(response.data.projects[0]?._id);
                }
                else {
                    setMessage(response.data.message || 'L???y danh d??? ??n th???t b???i. Vui l??ng th??? l???i !');
                    toggleModalError();
                }
            },
            (error) => {
                if (error.response && error.response.status === Common.HTTP_STATUS.UNAUTHORIZED) {
                    navigate(LinkName.LOGIN);
                } else {
                    setMessage(error.response?.message || 'L???y danh d??? ??n th???t b???i. Vui l??ng th??? l???i !');
                    toggleModalError();
                }
            }
        );
    }

    const _onDetail = (id) => {
        projectApi.detail(id).then(
            (response) => {
                if (response.status === Common.HTTP_STATUS.OK) {
                    setTaskCategoryList(response.data.project.category);
                    setTaskStatusList(response.data.project.status);
                    let memberList = response.data.project.members;
                    memberList.push(response.data.project.project_manager);
                    setTaskMemberList(memberList);
                }
                else {
                    setMessage(response.data.message || 'L???y th??ng tin d??? ??n th???t b???i. Vui l??ng th??? l???i !');
                    toggleModalError();
                }
            },
            (error) => {
                if (error.response && error.response.status === Common.HTTP_STATUS.UNAUTHORIZED) {
                    navigate(LinkName.LOGIN);
                } else {
                    setMessage(error.response?.message || 'L???y th??ng tin d??? ??n th???t b???i. Vui l??ng th??? l???i !');
                    toggleModalError();
                }
            }
        );
    }

    const _getParentTask = (id) => {
        taskApi.list(id).then(
            (response) => {
                if (response.status === Common.HTTP_STATUS.OK) {
                    setTaskParentList(response.data.tasks);
                }
                else {
                    setMessage(response.data.message || 'L???y th??ng tin c??ng vi???c th???t b???i. Vui l??ng th??? l???i !');
                    toggleModalError();
                }
            },
            (error) => {
                if (error.response && error.response.status === Common.HTTP_STATUS.UNAUTHORIZED) {
                    navigate(LinkName.LOGIN);
                } else {
                    setMessage(error.response?.message || 'L???y th??ng tin c??ng vi???c th???t b???i. Vui l??ng th??? l???i !');
                    toggleModalError();
                }
            }
        );
    }

    const _onSubmit = () => {
        const data = new FormData();
        if (files) {
            for (const key of Object.keys(files)) {
                data.append('files', files[key])
            }
        }

        if (getValues('parent_task')) {
            data.append('parent_task', getValues('parent_task'));
        }

        data.append('project', getValues('project') ? getValues('project') : projectList[0]?._id);
        data.append('task_start_date', getValues('task_start_date'));
        data.append('task_end_date', getValues('task_end_date'));
        data.append('category', getValues('category') ? getValues('category') : taskCategoryList[0]);
        data.append('status', getValues('status') ? getValues('status') : taskStatusList[0]);
        data.append('title', getValues('title'));
        data.append('description', getValues('description'));
        data.append('priority', getValues('priority') ? getValues('priority') : TypeCode.TASK.PRIORITY.LOW);
        data.append('estimate_time', getValues('estimate_time'));
        data.append('actual_time', getValues('actual_time'));
        data.append('assign', getValues('assign') ? getValues('assign') : taskMemberList[0]?._id);
        data.append('user_create', userData?._id);

        taskApi.create(data).then(
            (response) => {
                if (response.status === Common.HTTP_STATUS.OK) {
                    setMessage(response.data.message || '????ng k?? c??ng vi???c th??nh c??ng !');
                    toggleModalSuccess();
                }
                else {
                    setMessage(response.data.message || '????ng k?? c??ng vi???c th???t b???i. Vui l??ng th??? l???i !');
                    toggleModalError();
                }
            },
            (error) => {
                if (error.response && error.response.status === Common.HTTP_STATUS.UNAUTHORIZED) {
                    navigate(LinkName.LOGIN);
                } else {
                    setMessage(error.response?.message || '????ng k?? c??ng vi???c th???t b???i. Vui l??ng th??? l???i !');
                    toggleModalError();
                }
            }
        );
    }

    const watchProject = watch('project');
    useEffect(() => {
        if (watchProject) {
            _onDetail(watchProject);
            _getParentTask(watchProject);
        }
    }, [watchProject]);


    useEffect(() => {
        if (token) {
            _getProjectList();
            setUserData(getUserDataFromLocalStorage);
        } else {
            navigate(LinkName.LOGIN);
        }
        // eslint-disable-next-line
    }, [token]);
    /**
     * render template
     */
    return (
        <section id="basic-vertical-layouts">
            <div className="row match-height">
                <div className="col-md-12 col-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">T???O C??NG VI???C</h4>
                        </div>
                        <div className="card-content">
                            <div className="card-body">
                                <FormProvider {...methods}>
                                    <form className="form form-vertical" onSubmit={handleSubmit(_onSubmit)}>
                                        <div className="form-body">
                                            <div className="row">
                                                <div className="col-xl-6 col-md-6 col-xs-6">
                                                    <div className="form-group has-icon-left">
                                                        <label htmlFor="first-name-icon text-bold-500"><h6>D??? ??n:</h6></label>
                                                        <div className="position-relative">
                                                            <select className="choices form-select"
                                                                {...register("project")}>
                                                                {projectList.length > 0 && projectList.map((item, idx) => (
                                                                    <option key={idx} value={item?._id}>{item?.project_name}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-md-6 col-xs-6">
                                                    <div className="form-group has-icon-left">
                                                        <label htmlFor="first-name-icon text-bold-500"><h6>Ph??n lo???i:</h6></label>
                                                        <div className="position-relative">
                                                            <select className="choices form-select"
                                                                {...register("category")}>
                                                                {taskCategoryList.length > 0 && taskCategoryList.map((item, idx) => (
                                                                    <option key={idx} value={item}>{TypeCode.PROJECT.CATEGORY_MAPPING[+item]}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xl-12 col-md-12 col-xs-12">
                                                    <div className="form-group">
                                                        <label htmlFor="first-name-icon text-bold-500">
                                                            <h6 className="required">Ti??u ?????:</h6>
                                                        </label>
                                                        <div className="position-relative">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                {...register(
                                                                    "title",
                                                                    {
                                                                        required: {
                                                                            value: true,
                                                                            message: replaceString(Message.TEXT.REQUIRED, ["Ti??u ?????"]),
                                                                        },
                                                                        maxLength: {
                                                                            value: Validation.TEXT.MAX_LENGTH,
                                                                            message: replaceString(Message.TEXT.MAX_LENGTH, ["Ti??u ?????", Validation.TEXT.MAX_LENGTH]),
                                                                        },
                                                                        minLength: {
                                                                            value: Validation.TEXT.MIN_LENGTH,
                                                                            message: replaceString(Message.TEXT.MIN_LENGTH, ["Ti??u ?????", Validation.TEXT.MIN_LENGTH]),
                                                                        },
                                                                    }
                                                                )}
                                                                onBlur={(e) => { _onBlur(e.currentTarget.name, e.currentTarget.value) }}
                                                            />
                                                            {errors.title && (
                                                                <FormFeedback className="d-block">{errors.title.message}</FormFeedback>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xl-12 col-md-12 col-xs-12">
                                                    <div className="form-group">
                                                        <label htmlFor="first-name-icon text-bold-500">
                                                            <h6 className="required">M?? t???:</h6>
                                                        </label>
                                                        <div className="position-relative">
                                                            <textarea
                                                                type="text"
                                                                rows={5}
                                                                className="form-control"
                                                                {...register(
                                                                    "description",
                                                                    {
                                                                        required: {
                                                                            value: true,
                                                                            message: replaceString(Message.TEXT.REQUIRED, ["Ti??u ?????"]),
                                                                        },
                                                                        minLength: {
                                                                            value: Validation.TEXT.MIN_LENGTH,
                                                                            message: replaceString(Message.TEXT.MIN_LENGTH, ["M?? t???", Validation.TEXT.MIN_LENGTH]),
                                                                        },
                                                                    }
                                                                )}
                                                                onBlur={(e) => { _onBlur(e.currentTarget.name, e.currentTarget.value) }}
                                                            />
                                                        </div>
                                                        {errors.description && (
                                                            <FormFeedback className="d-block">{errors.description.message}</FormFeedback>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-xl-6 col-md-6 col-xs-6">
                                                    <div className="row">
                                                        <div className="col-xl-12 col-md-12 col-xs-12">
                                                            <div className="form-group">
                                                                <label htmlFor="first-name-icon"><h6>Tr???ng th??i :</h6></label>
                                                                <div className="position-relative">
                                                                    <select className="choices form-select"
                                                                        {...register("status")}>
                                                                        {taskStatusList.length > 0 && taskStatusList.map((item, idx) => (
                                                                            <option key={idx} value={item}>{TypeCode.PROJECT.STATUS_MAPPING[+item]}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-12 col-md-12 col-xs-12">
                                                            <div className="form-group">
                                                                <label htmlFor="first-name-icon"><h6>????? ??u ti??n :</h6></label>
                                                                <div className="position-relative">
                                                                    <select className="choices form-select"
                                                                        {...register("priority")}>
                                                                        <option value={TypeCode.TASK.PRIORITY.LOW}>{TypeCode.TASK.PRIORITY_MAPPING[TypeCode.TASK.PRIORITY.LOW]}</option>
                                                                        <option value={TypeCode.TASK.PRIORITY.NORMAL}>{TypeCode.TASK.PRIORITY_MAPPING[TypeCode.TASK.PRIORITY.NORMAL]}</option>
                                                                        <option value={TypeCode.TASK.PRIORITY.HIGH}>{TypeCode.TASK.PRIORITY_MAPPING[TypeCode.TASK.PRIORITY.HIGH]}</option>
                                                                        <option value={TypeCode.TASK.PRIORITY.URGENT}>{TypeCode.TASK.PRIORITY_MAPPING[TypeCode.TASK.PRIORITY.URGENT]}</option>
                                                                        <option value={TypeCode.TASK.PRIORITY.OTHER}>{TypeCode.TASK.PRIORITY_MAPPING[TypeCode.TASK.PRIORITY.OTHER]}</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-12 col-md-12 col-xs-12">
                                                            <div className="form-group">
                                                                <label htmlFor="first-name-icon"><h6>Ph??n c??ng cho :</h6></label>
                                                                <div className="position-relative">
                                                                    <select className="choices form-select"
                                                                        {...register("assign")}>
                                                                        {taskMemberList.length > 0 && taskMemberList.map((item, idx) => (
                                                                            <option key={idx} value={item?._id}>{item?.fullname}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-md-6 col-xs-6">
                                                    <div className="row">
                                                        <div className="col-xl-12 col-md-12 col-xs-12">
                                                            <div className="form-group">
                                                                <label htmlFor="first-name-icon"><h6>C??ng vi???c cha :</h6></label>
                                                                <div className="position-relative">
                                                                    <select className="choices form-select"
                                                                        {...register("parent_task")}>
                                                                        <option value="">Kh??ng c??</option>
                                                                        {
                                                                            taskParentList.length > 0 && taskParentList.map((item, idx) => (
                                                                                <option key={idx} value={item?._id}>{item?.title}</option>
                                                                            ))}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-6 col-md-6 col-xs-6">
                                                            <div className="form-group">
                                                                <label htmlFor="first-name-icon text-bold-500"><h6>Ng??y b???t ?????u :</h6></label>
                                                                <div className="position-relative">
                                                                    <input
                                                                        type="date"
                                                                        className="form-control"
                                                                        {...register(
                                                                            "task_start_date"
                                                                        )}
                                                                        onBlur={(e) => { _onBlur(e.currentTarget.name, e.currentTarget.value) }}
                                                                    />
                                                                </div>
                                                                {errors.task_start_date && (
                                                                    <FormFeedback className="d-block">{errors.task_start_date.message}</FormFeedback>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-6 col-md-6 col-xs-6">
                                                            <div className="form-group">
                                                                <label htmlFor="first-name-icon text-bold-500"><h6>Ng??y k???t th??c :</h6></label>
                                                                <div className="position-relative">
                                                                    <input
                                                                        type="date"
                                                                        className="form-control"
                                                                        {...register(
                                                                            "task_end_date"
                                                                        )}
                                                                        onBlur={(e) => { _onBlur(e.currentTarget.name, e.currentTarget.value) }}
                                                                    />
                                                                </div>
                                                                {errors.task_end_date && (
                                                                    <FormFeedback className="d-block">{errors.task_end_date.message}</FormFeedback>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-6 col-md-6 col-xs-6">
                                                            <div className="form-group">
                                                                <label htmlFor="first-name-icon text-bold-500"><h6>Th???i gian ?????c t??nh :</h6></label>
                                                                <div className="position-relative">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        {...register(
                                                                            "estimate_time"
                                                                        )}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-6 col-md-6 col-xs-6">
                                                            <div className="form-group">
                                                                <label htmlFor="first-name-icon text-bold-500"><h6>Th???i gian th???c t??? :</h6></label>
                                                                <div className="position-relative">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        {...register(
                                                                            "actual_time"
                                                                        )}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xl-12 col-md-12 col-xs-12">
                                                    <div className="form-group">
                                                        <label htmlFor="first-name-icon text-bold-500"><h6>File t???i l??n:</h6></label>
                                                        <div className="position-relative">
                                                            <input
                                                                type="file"
                                                                className="form-control"
                                                                multiple
                                                                onChange={_onChangeFile}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 d-flex justify-content-center">
                                                    <button type="submit" className="btn btn-primary btn-sm me-3 mb-3 mt-3 btn-custom">L??u</button>
                                                    <button type="button" className="btn btn-light-secondary btn-sm me-3 mb-3 mt-3 btn-custom">H???y</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </FormProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                modalError &&
                <ModalErrorComponent
                    modal={modalError}
                    toggle={toggleModalError}
                    message={message}
                />
            }

            {
                modalSuccess &&
                <ModalSuccessComponent
                    modal={modalSuccess}
                    toggle={toggleModalSuccess}
                    message={message}
                />
            }
        </section>
    );
}