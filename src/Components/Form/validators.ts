import { split, head, last, size, some } from 'lodash-es';

export const validateEmail = (email?: string): string | undefined => {
    const regExp = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (!email) {
        return 'form.input.email.requiredValidation';
    }

    const emailParts = split(email, '@');
    if (emailParts.length !== 2) {
        return 'form.input.email.badEmailValidation';
    }

    const account = head(emailParts);
    const address = last(emailParts);
    if (size(account) > 64) {
        return 'form.input.email.badEmailValidation';
    } else if (size(account) > 255) {
        return 'form.input.email.badEmailValidation';
    }

    const domainParts = split(address, '.');
    if (some(domainParts, (part) => {
        return size(part) > 63;
    })) {
        return 'form.input.email.badEmailValidation';
    }

    if (!regExp.test(email)) {
        return 'form.input.email.badEmailValidation';
    }

    return undefined;
};


export const validatePassword = (password?: string): string | undefined => {
    // const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/;
    if (!password) {
        return 'form.input.password.requireValidation';
    }

    if (size(password) < 3) {
        return 'form.input.password.tooWeakValidation';
    }
    // if (!regExp.test(password)) {

    //   return 'form.input.password.tooWeakValidation';

    // }

    return undefined;
};


export const requirePassword = (password?: string): string | undefined => {
    if (!password) {
        return 'form.input.password.requireValidation';
    }
};


export const requireEmail = (email?: string): string | undefined => {
    if (!email) {
        return 'form.input.email.requiredValidation';
    }
};


export const required = (value: any): string | undefined => {
    return (value ? undefined : 'form.input.field.requiredValidation');
};


export const composeValidators = (...validators: any[]) => {
    return (value: string | null | undefined) => {
        return validators.reduce((error, validator) => {
            return error || validator(value);
        }, undefined);
    };
};

const FormValidators = {
    validateEmail,
    required,
    requireEmail,
    requirePassword,
    validatePassword,
    composeValidators,
};

export default FormValidators;
