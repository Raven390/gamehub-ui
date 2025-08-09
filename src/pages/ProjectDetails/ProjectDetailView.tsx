import React, {useState} from "react";
import {Project, ProjectType} from "../../types/Project";
import styles from "./ProjectDetailView.module.css";
import {updateProject} from "../../api/ProjectsApi";
import {EditableField} from "../../components/ui/EditableField";
import {EditableDropdown} from "../../components/ui/EditableDropdown";
import {EditableMultiSelect} from "../../components/ui/EditableMultiSelect";

interface RefItem {
    id: number | string;
    name: string;
}

interface ProjectDetailViewProps {
    project: Project;
    technologiesList: RefItem[];
    rolesList: RefItem[];
    projectTypes: ProjectType[];
    canEdit: boolean;
}

const statusOptions = [
    {value: "DRAFT", label: "Черновик"},
    {value: "ACTIVE", label: "Активен"},
    {value: "RECRUITING", label: "Набор"},
    {value: "ARCHIVED", label: "Архив"},
];


export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
                                                                        project,
                                                                        technologiesList,
                                                                        rolesList,
                                                                        projectTypes,
                                                                        canEdit,
                                                                    }) => {
    const [localProject, setLocalProject] = useState<Project>(project);
    const [nameLoading, setNameLoading] = useState(false);
    const [shortDescLoading, setShortDescLoading] = useState(false);

    const validateShortDesc = (val: string) => {
        if (!val.trim()) return "Описание не может быть пустым";
        if (val.length < 8) return "Слишком короткое описание";
        if (val.length > 120) return "Максимум 120 символов";
        return null;
    };

    const handleShortDescSave = async (newShort: string) => {
        setShortDescLoading(true);
        try {
            await updateProject(localProject.id, {shortDescription: newShort});
            setLocalProject(prev => ({...prev, shortDescription: newShort}));
        } finally {
            setShortDescLoading(false);
        }
    };

    // --- EditableField для Полного описания ---
    const [descLoading, setDescLoading] = useState(false);

    const handleDescSave = async (newDesc: string) => {
        setDescLoading(true);
        try {
            await updateProject(localProject.id, {description: newDesc});
            setLocalProject(prev => ({...prev, description: newDesc}));
        } finally {
            setDescLoading(false);
        }
    };

    const validateDesc = (val: string) => {
        if (!val.trim()) return "Описание не может быть пустым";
        if (val.length > 3000) return "Максимум 3000 символов";
        return null;
    };

    const [statusLoading, setStatusLoading] = useState(false);

    const handleStatusSave = async (newStatus: string) => {
        setStatusLoading(true);
        try {
            await updateProject(localProject.id, {status: newStatus as Project["status"]});
            setLocalProject(prev => ({...prev, status: newStatus as Project["status"]}));
        } finally {
            setStatusLoading(false);
        }
    };

    const [typeLoading, setTypeLoading] = useState(false);

    const handleTypeSave = async (newTypeId: string) => {
        setTypeLoading(true);
        try {
            await updateProject(localProject.id, { typeId: newTypeId });

            const updatedType: ProjectType | undefined = projectTypes.find(
                t => t.id === newTypeId
            );

            setLocalProject(prev => ({
                ...prev,
                type: updatedType, // строго ProjectType | undefined
            }));
        } catch (e) {
            console.error(e);
        } finally {
            setTypeLoading(false);
        }
    };



    // --- Технологии ---
    const [techsLoading, setTechsLoading] = useState(false);

    const handleTechsSave = async (newTechNames: string[]) => {
        setTechsLoading(true);
        try {
            // Мапим имена в id
            const techIds: number[] = technologiesList
                .filter(t => newTechNames.includes(t.name))
                .map(t => Number(t.id));

            await updateProject(localProject.id, {technologyIds: techIds});
            setLocalProject(prev => ({...prev, technologyNames: newTechNames}));
        } finally {
            setTechsLoading(false);
        }
    };

    // --- Роли ---
    const [rolesLoading, setRolesLoading] = useState(false);

    const handleRolesSave = async (newRoleNames: string[]) => {
        setRolesLoading(true);
        try {
            // Мапим имена в id
            const roleIds: number[] = rolesList
                .filter(r => newRoleNames.includes(r.name))
                .map(r => Number(r.id));

            await updateProject(localProject.id, {roleIds: roleIds});
            setLocalProject(prev => ({...prev, roleNames: newRoleNames}));
        } finally {
            setRolesLoading(false);
        }
    };

    // ---- EditableField интеграция ----
    const handleNameSave = async (newName: string) => {
        setNameLoading(true);
        try {
            await updateProject(localProject.id, {name: newName});
            setLocalProject(prev => ({...prev, name: newName}));
        } finally {
            setNameLoading(false);
        }
    };

    const validateName = (val: string) => {
        if (!val.trim()) return "Название не может быть пустым";
        if (val.length < 3) return "Слишком короткое название";
        if (val.length > 64) return "Максимум 64 символа";
        return null;
    };

    return (
        <div className={styles.container}>
            {/* Заголовок + статус */}
            <div className={styles.header}>
                <div className={styles.avatarBlock}>
                    {localProject.avatarUrl ? (
                        <img className={styles.avatar} src={localProject.avatarUrl} alt={localProject.name}/>
                    ) : (
                        <div className={styles.avatarFallback}>
                            {localProject.name.slice(0, 2).toUpperCase()}
                        </div>
                    )}
                </div>
                <div className={styles.titleBlock}>
                    <EditableField
                        label="Название проекта"
                        value={localProject.name}
                        canEdit={canEdit}
                        onSave={handleNameSave}
                        loading={nameLoading}
                        maxLength={64}
                        validate={validateName}
                        placeholder="Введите название"
                    />
                    <div className={styles.section}>
                        <EditableDropdown
                            label="Статус"
                            value={localProject.status || "DRAFT"}
                            options={statusOptions}
                            canEdit={canEdit}
                            onSave={handleStatusSave}
                            loading={statusLoading}
                        />
                    </div>
                </div>
            </div>

            {/* Краткое описание */}
            <div className={styles.section}>
                <EditableField
                    label="Краткое описание"
                    value={localProject.shortDescription}
                    canEdit={canEdit}
                    onSave={handleShortDescSave}
                    loading={shortDescLoading}
                    maxLength={120}
                    validate={validateShortDesc}
                    placeholder="В двух словах о проекте"
                />
            </div>

            {/* Полное описание */}
            <div className={styles.section}>
                <EditableField
                    label="Описание"
                    value={localProject.description}
                    canEdit={canEdit}
                    onSave={handleDescSave}
                    loading={descLoading}
                    maxLength={3000}
                    validate={validateDesc}
                    inputType="textarea"
                    placeholder="Полное описание проекта (можно форматировать)"
                />
            </div>

            {/* Технологии */}
            <div className={styles.section}>
                <EditableMultiSelect
                    label="Технологии"
                    values={localProject.technologyNames ?? []}
                    options={technologiesList}
                    canEdit={canEdit}
                    onSave={handleTechsSave}
                    loading={techsLoading}
                    placeholder="Выберите технологии"
                />
            </div>

            {/* Роли */}
            <div className={styles.section}>
                <EditableMultiSelect
                    label="Роли"
                    values={localProject.roleNames ?? []}
                    options={rolesList}
                    canEdit={canEdit}
                    onSave={handleRolesSave}
                    loading={rolesLoading}
                    placeholder="Выберите роли"
                />
            </div>

            {/* Тип проекта */}
            <div className={styles.section}>
                <EditableDropdown
                    label="Тип проекта"
                    value={localProject.type?.id || ''}
                    options={projectTypes.map(type => ({
                        value: type.id,
                        label: type.name,
                    }))}

                    canEdit={canEdit}
                    onSave={handleTypeSave}
                    loading={typeLoading}
                />

            </div>

            {/* Владелец */}
            <div className={styles.section}>
                <div className={styles.label}>Владелец</div>
                <div className={styles.ownerBlock}>
                    <div className={styles.ownerAvatar}>
                        {localProject.ownerName.slice(0, 2).toUpperCase()}
                    </div>
                    <span className={styles.ownerName}>{localProject.ownerName}</span>
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.label}>Дата создания</div>
                <span className={styles.date}>
                    {localProject.createdAt ? new Date(localProject.createdAt).toLocaleDateString() : "–"}
                </span>
            </div>
        </div>
    );
};

function statusLabel(status?: Project["status"]) {
    switch (status) {
        case "DRAFT":
            return "Черновик";
        case "ACTIVE":
            return "Активен";
        case "RECRUITING":
            return "Набор";
        case "ARCHIVED":
            return "Архив";
        default:
            return "—";
    }
}
