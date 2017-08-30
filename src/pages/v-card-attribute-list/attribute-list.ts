export interface VCardSelection {
    displayName: string;
    selector: string;
}

export const CardList: VCardSelection[] = [
    { displayName: 'First Name', selector: 'firstName' },
    { displayName: 'Middle Name', selector: 'middleName' },
    { displayName: 'Last Name', selector: 'lastName' },
    { displayName: 'Unique Id', selector: 'uid' },
    { displayName: 'Organization', selector: 'organization' },
    { displayName: 'Home Phone', selector: 'homePhone' },
    { displayName: 'Cell Phone', selector: 'cellPhone' },
    { displayName: 'Work Phone', selector: 'workPhone' },
    { displayName: 'Email', selector: 'email' },
    { displayName: 'Work Mail', selector: 'workEmail' },
];