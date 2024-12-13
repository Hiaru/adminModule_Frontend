
/**
* TYPE OF VALIDATION AND DATA FOR ALL FORMS
 * 
 * {
 *      formName: {
 *          inputsName : {data: 'regex', type 'type of data', required: boolean},
 *      }
 * }
 */
const typeValidations = {
    login: {
        username    :   {data: /^[a-zA-ZÀ-ÿ\s]{2,50}$/, type: 'text', required: true},
        password    :   {data: /^((.){2,80})/, type: 'text', required: true},
    },
}

/**
 * ERROR MESSAGES FOR ALL FORMS
 * 
 * {
 *      formName: {
 *          inputsName : 'error-messages',
 *      }
 * }
 */
const errorMessages = {
    introductorySheet:
    {
        username: 'El usuario es requerido',
        password: 'La contraseña es requerida'
    }
}

/**
 * @validate
 * 
 * METHODS VALIDATION FOR ANY INPUT OF 
 * ANY FORM
 * 
 * @param {string} form -> FORMULARY NAME
 * @param {string} input -> INPUT TO VALIDATE
 * @param {string} value -> VALUE OF THE INPUT TO VALIDATE
 * @returns {array || boolean} -> RETURNS AN ARRAY WITH ERROR MESSAGES OR TRUE ONLY
 */
export async function validate(form ,input, value, isActive = false) {
    /**
     * IF INPUT IS EMPTY AND IS REQUIRED
     */
    if((((value == 0) || (value == '')) && (typeValidations[form][input].required))){
        return [false, 'Error', 'Este campo no puede estar vacío'] 

    /**
     * IF INPUT IS NOT EMPTY AND REQUIRED
     */
    }else if(typeValidations[form][input].required || isActive){
        switch (typeValidations[form][input].type){
            case 'selector':
                var response = false;
                const selector = await getData([typeValidations[form][input].data]);
                for (const iterator of selector[typeValidations[form][input].data]) {
                    if(!(value != iterator[0])){
                        response = true;
                    }
                }

                if(!response){
                    return [false, 'Error', errorMessages[form][input]];
                }else{
                    return true;
                }
            break;
            case 'text':
                if(input !== 'username' && input !== 'password'){
                    if(!(typeValidations[form][input].data.test(value))){
                        return [false, 'Error', errorMessages[form][input]];
                    }else{
                        return true;
                    }
                }
            break;
        }
    } 
}