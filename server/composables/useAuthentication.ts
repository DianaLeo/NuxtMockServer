import type {
    CustomerAccountResponse,
    CustomerData,
    FrontendLogin,
    FrontendRegistration,
} from "~/types"
import {hashPassword, verifyPassword} from "~/server/utils/password"
import {generateToken} from "~/server/utils/jwt"

export const useAuthentication = () => {
    const findUserByEmail = async (email:string):Promise<CustomerData& {id:string} | undefined> => {
        let users:(CustomerData & {id:string})[]
        try{
            users = await $fetch('http://localhost:8080/users')
        }catch (e){
            throw InternalError("Internal error fetching users")
        }
        return users.find((user:CustomerData & {id:string})=>user.email===email)
    }

    const login = async ({email, password}:FrontendLogin):Promise<Omit<CustomerData, "password"> & {id:string}> => {
        if (!email || !password) {
            throw BadRequestError("Email address and password are required")
        }

        const user = await findUserByEmail(email)
        if (!user) {
            throw UnauthorizedError("User not found")
        }

        const passwordValidated = await verifyPassword(password, user.password)
        if (!passwordValidated) {
            throw UnauthorizedError("Invalid password")
        }

        const {password:_password, ...userWithoutPassword} = user
        return userWithoutPassword
    }

    const findCountryByCode = (code:string) => {
        return "Placeholder"
    }

    const toCustomerData = (registerBody:FrontendRegistration,token:string):CustomerData => {
        return {
            freeBets: [],
            address: registerBody.account.address,
            phoneNumber: registerBody.account.phoneNumber,
            city: registerBody.account.city,
            country: findCountryByCode(registerBody.account.countryCode),
            countryISO3: registerBody.account.countryCode,
            postalCode: registerBody.account.postalCode,
            phoneCode: registerBody.account.phoneCode,
            customerId: "placeholder",
            firstName: registerBody.account.firstName,
            lastName: registerBody.account.lastName,
            email: registerBody.account.email,
            password: registerBody.account.password,
            dateOfBirth: registerBody.account.dateOfBirth,
            accountPreferences: {
                zoneId: "placeholder",
                languageCode: registerBody.account.languageCode,
                preferredFiatCurrency: registerBody.account.currencyCode,
                preferredGameLaunchCurrency: registerBody.account.currencyCode,
                hidden: true,
            },
            communicationsVerified: false,
            balances: [
                {
                    currency: "placeholder",
                    currencyPrecision: 0,
                    balance: 0,
                    bonusBalance: 0,
                    vaultBalance: 0
                }
            ],
            tokenRenewUrl: token,
            currency: registerBody.account.currencyCode,
            mfaLogin: false,
            mfaWithdrawal: null,
            mfaStatus: "NOT_SET",
            mfaReferenceId: null,
            remind2FA: null,
            kycData: {
                idvStatus: "NOT_VERIFIED",
                poaStatus: "NOT_VERIFIED",
                displayType: null,
            },
            loginType: 'PASSWORD'
        }
    }

    const toCustomerAccountResponse = (newUser:CustomerData & {id:string},registerBody:FrontendRegistration):CustomerAccountResponse => {
        return {
            nickName: registerBody.account.nickName,
            firstName: newUser.firstName,
            middleName: registerBody.account.middleName,
            lastName: newUser.lastName,
            gender: registerBody.account.gender,
            email: newUser.email,
            countryCode: newUser.countryISO3,
            ipCountryCode: null,
            languageCode: registerBody.account.languageCode,
            currencyCode: registerBody.account.currencyCode,
            phoneNumber: newUser.phoneNumber,
            phoneCode: newUser.phoneCode,
            registrationDate: new Date().toISOString(),
            address: newUser.address,
            city: newUser.city,
            zip: registerBody.account.zip,
            dateOfBirth: newUser.dateOfBirth,
            timeZone: registerBody.account.timeZone,
            testAccount: true,
            contactEmail: true,
            contactSms: true,
            customerId: newUser.id,
            externalId: null,
            affiliateData: null,
            preferences: null,
            status: null,
            loginType: "PASSWORD",
        }
    }

    const signup = async (registerBody:FrontendRegistration):Promise<CustomerAccountResponse> => {
        const user = await findUserByEmail(registerBody.account.email)
        if (user) {
            throw ConflictError("This email is already registered")
        }

        let newUser:CustomerData & {id:string}

        registerBody.account.password = await hashPassword(registerBody.account.password)
        const token = generateToken({id:registerBody.account.email})
        const transformedBody = toCustomerData(registerBody,token)

        try {
            newUser = await $fetch('http://localhost:8080/users',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: transformedBody
            })
        } catch (e) {
            throw InternalError("Internal error fetching users")
        }

        return toCustomerAccountResponse(newUser,registerBody)
    }

    return {
        login,
        signup,
    }
}
