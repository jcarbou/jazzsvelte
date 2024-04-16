<script lang="ts">
import { importJS, importTS} from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'

    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'

    import Button from '$lib/components/button/Button.svelte'
    import InputText from '$lib/components/inputtext/InputText.svelte'
    import Toast from '$lib/components/toast/Toast.svelte'
    import classs from '$lib/components/utils/classs.svelte'
import { useFormik } from 'formik';
import { useRef } from 'react';

    import type { DocSection } from '$lib/doc/common/doc.types'
    
    export let docSection: DocSection

    const toast = useRef(null);

    </script>
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: formik.values.value });
    };

    const formik = useFormik({
        initialValues: {
            value: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.value) {
                errors.value = 'Name - Surname is required.';
            }
        },
        onSubmit: (data) => {
            data && show(data);
            formik.resetForm();
        }
    });

    </script>

    </script>
    };

    const code = {
        basic: `
<Toast ref={toast} />
<InputText
    id="value"
    name="value"
    value={formik.values.value}
    onChange={(e) => {
        formik.setFieldValue('value', e.target.value);
    }}
    class={classs({ 'p-invalid': isFormFieldInvalid('value') })}
/>
        `,
        javascript: `
${importJS('InputText')}import { useFormik } from 'formik';

import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { classs } from 'primereact/utils';

    const toast = useRef(null);

    </script>
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: formik.values.value });
    };

    const formik = useFormik({
        initialValues: {
            value: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.value) {
                errors.value = 'Name - Surname is required.';
            }
        },
        onSubmit: (data) => {
            data && show(data);
            formik.resetForm();
        }
    });

    </script>

    </script>
    };
        <div class="card flex justify-content-center">
            <form onSubmit={formik.handleSubmit} class="flex flex-column gap-2">
                <span class="p-float-label">
                    <Toast ref={toast} />
                    <InputText
                        id="value"
                        name="value"
                        value={formik.values.value}
                        onChange={(e) => {
                            formik.setFieldValue('value', e.target.value);
                        }}
                        class={classs({ 'p-invalid': isFormFieldInvalid('value') })}
                    />
                    <label htmlFor="input_value">Name - Surname</label>
                </span>
                {getFormErrorMessage('value')}
                <Button type="submit" label="Submit" />
            </form>
        </div>

        `,
        typescript: `
${importTS('InputText')}import { useFormik } from 'formik';

import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { classs } from 'primereact/utils';

    const toast = useRef(null);

    </script>
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: formik.values.value });
    };

    const formik = useFormik({
        initialValues: {
            value: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.value) {
                errors.value = 'Name - Surname is required.';
            }
        },
        onSubmit: (data) => {
            data && show(data);
            formik.resetForm();
        }
    });

    </script>

    </script>
    };
        <div class="card flex justify-content-center">
            <form onSubmit={formik.handleSubmit} class="flex flex-column gap-2">
                <span class="p-float-label">
                    <Toast ref={toast} />
                    <InputText
                        id="value"
                        name="value"
                        value={formik.values.value}
                        onChange={(e) => {
                            formik.setFieldValue('value', e.target.value);
                        }}
                        class={classs({ 'p-invalid': isFormFieldInvalid('value') })}
                    />
                    <label htmlFor="input_value">Name - Surname</label>
                </span>
                {getFormErrorMessage('value')}
                <Button type="submit" label="Submit" />
            </form>
        </div>

        `
    };

</script>

<DocSectionText docSection={docSection}>
                <p>
                    <a href="https://formik.org/">Formik</a> is a popular library for handling forms in React.
                </p>
            </DocSectionText>
            <div class="card flex justify-content-center">
                <form onSubmit={formik.handleSubmit} class="flex flex-column gap-2">
                    <span class="p-float-label">
                        <Toast ref={toast} />
                        <InputText
                            id="value"
                            name="value"
                            value={formik.values.value}
                            onChange={(e) => {
                                formik.setFieldValue('value', e.target.value);
                            }}
                            class={classs({ 'p-invalid': isFormFieldInvalid('value') })}
                        />
                        <label htmlFor="input_value">Name - Surname</label>
                    </span>
                    {getFormErrorMessage('value')}
                    <Button type="submit" label="Submit" />
                </form>
            </div>
            <DocSectionCode code={code} dependencies={{ formik: '^2.2.6' }} />




