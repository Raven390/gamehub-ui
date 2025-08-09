import React, { useState } from "react";
import styles from "./ProjectMembersBlock.module.css";
import { FieldEditIcon } from "./FieldEditIcon";

interface Member {
    id: string;
    name: string;
    avatarUrl?: string;
    roles: string[];
    isOwner?: boolean;
}

interface ProjectMembersBlockProps {
    owner: Member;
    members: Member[];
    allRoles: string[]; // список всех ролей (для селекта)
    canEdit: boolean;
    onInvite: (email: string, roles: string[]) => Promise<void>;
    onChangeRole: (userId: string, roles: string[]) => Promise<void>;
    onRemove: (userId: string) => Promise<void>;
    loading?: boolean;
}

export const ProjectMembersBlock: React.FC<ProjectMembersBlockProps> = ({
                                                                            owner,
                                                                            members,
                                                                            allRoles,
                                                                            canEdit,
                                                                            onInvite,
                                                                            onChangeRole,
                                                                            onRemove,
                                                                            loading = false,
                                                                        }) => {
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRoles, setInviteRoles] = useState<string[]>([]);
    const [inviteLoading, setInviteLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInvite = async () => {
        if (!inviteEmail || !inviteEmail.includes("@")) {
            setError("Укажите корректный email");
            return;
        }
        setInviteLoading(true);
        setError(null);
        try {
            await onInvite(inviteEmail, inviteRoles);
            setInviteEmail("");
            setInviteRoles([]);
        } catch (e: any) {
            setError(e?.message || "Ошибка приглашения");
        } finally {
            setInviteLoading(false);
        }
    };

    return (
        <div className={styles.membersBlock}>
            <div className={styles.label}>Участники</div>

            <div className={styles.membersList}>
                {/* Owner всегда первый */}
                <MemberCard
                    key={owner.id}
                    member={owner}
                    isOwner
                    canEdit={false}
                    roles={owner.roles}
                    allRoles={allRoles}
                    onChangeRole={() => {}}
                    onRemove={() => {}}
                />

                {members.filter(m => m.id !== owner.id).map(member => (
                    <MemberCard
                        key={member.id}
                        member={member}
                        isOwner={false}
                        canEdit={canEdit}
                        roles={member.roles}
                        allRoles={allRoles}
                        onChangeRole={roles => onChangeRole(member.id, roles)}
                        onRemove={() => onRemove(member.id)}
                    />
                ))}
            </div>

            {canEdit && (
                <div className={styles.inviteBlock}>
                    <input
                        className={styles.inviteInput}
                        placeholder="Email или username"
                        value={inviteEmail}
                        disabled={inviteLoading}
                        onChange={e => setInviteEmail(e.target.value)}
                        type="email"
                    />
                    <select
                        className={styles.inviteSelect}
                        value={inviteRoles[0] || ""}
                        onChange={e => setInviteRoles(e.target.value ? [e.target.value] : [])}
                        disabled={inviteLoading}
                    >
                        <option value="">Роль…</option>
                        {allRoles.map(role => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>
                    <button
                        className={styles.inviteBtn}
                        disabled={inviteLoading || !inviteEmail || !inviteRoles.length}
                        onClick={handleInvite}
                    >Пригласить</button>
                    {inviteLoading && <span className={styles.spinner} />}
                    {error && <div className={styles.error}>{error}</div>}
                </div>
            )}
        </div>
    );
};

// Карточка участника
const MemberCard: React.FC<{
    member: Member;
    isOwner: boolean;
    canEdit: boolean;
    roles: string[];
    allRoles: string[];
    onChangeRole: (roles: string[]) => void;
    onRemove: () => void;
}> = ({
          member, isOwner, canEdit, roles, allRoles, onChangeRole, onRemove
      }) => {
    const [roleEdit, setRoleEdit] = useState(false);
    const [localRoles, setLocalRoles] = useState<string[]>(roles);

    const handleSaveRoles = () => {
        if (localRoles.sort().join(",") !== roles.sort().join(",")) {
            onChangeRole(localRoles);
        }
        setRoleEdit(false);
    };

    return (
        <div className={styles.memberCard}>
            <div className={styles.avatar}>
                {member.avatarUrl
                    ? <img src={member.avatarUrl} alt={member.name} />
                    : member.name.slice(0, 2).toUpperCase()
                }
            </div>
            <div className={styles.info}>
                <div className={styles.name}>{member.name} {isOwner && <span className={styles.ownerTag}>владелец</span>}</div>
                <div className={styles.roles}>
                    {!canEdit || isOwner || !allRoles.length
                        ? roles.map(r => <span key={r} className={styles.chip}>{r}</span>)
                        : roleEdit ? (
                            <select
                                className={styles.roleSelect}
                                value={localRoles[0] || ""}
                                onChange={e => setLocalRoles(e.target.value ? [e.target.value] : [])}
                                onBlur={handleSaveRoles}
                            >
                                <option value="">Роль…</option>
                                {allRoles.map(role => (
                                    <option key={role} value={role}>{role}</option>
                                ))}
                            </select>
                        ) : (
                            <span
                                className={styles.chipEditable}
                                onClick={() => setRoleEdit(true)}
                                tabIndex={0}
                            >
                                {roles.join(", ")} <FieldEditIcon className={styles.editIcon} />
                            </span>
                        )
                    }
                </div>
            </div>
            {canEdit && !isOwner && (
                <button className={styles.removeBtn} onClick={onRemove} title="Удалить из проекта">✖</button>
            )}
        </div>
    );
};
