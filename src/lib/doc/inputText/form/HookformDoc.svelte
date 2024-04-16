<script lang="ts">
import { importJS, importTS} from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'

    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'

    import Button from '$lib/components/button/Button.svelte'
    import InputText from '$lib/components/inputtext/InputText.svelte'
    import Toast from '$lib/components/toast/Toast.svelte'
    import classs from '$lib/components/utils/classs.svelte'
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';

    import type { DocSection } from '$lib/doc/common/doc.types'
    
    export let docSection: DocSection

    const toast = useRef(null);

    </script>
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: getValues('value') });
    };

    const defaultValues = {
        value: ''
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        reset
    } = useForm({ defaultValues });

    </script>
        data.value && show();

        reset();
    };

    </script>
    };

    const code = {
        basic: `
<Toast ref={toast} />
<Controller
    name="value"
    control={control}
    rules={{ required: 'Name - Surname is required.' }}
    render={({ field, fieldState }) => (

            <label htmlFor={field.name} class={classs({ 'p-error': errors.value })}></label>
            <span class="p-float-label">
                <InputText id={field.name} value={field.value} class={classs({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                <label htmlFor={field.name}>Name - Surname</label>
            </span>
            {getFormErrorMessage(field.name)}

    )}
/>     
`,
        javascript: `
${importJS('InputText')}import { Controller, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { classs } from 'primereact/utils';
import { Toast } from 'primereact/toast';


    const toast = useRef(null);

    </script>
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: getValues('value') });
    };

    const defaultValues = {
        value: ''
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        reset
    } = useForm({ defaultValues });

    </script>
        data.value && show();

        reset();
    };

    </script>
    };
        <div class="card flex justify-content-center">
            <form onSubmit={handleSubmit(onSubmit)} class="flex flex-column gap-2">
                <Toast ref={toast} />
                <Controller
                    name="value"
                    control={control}
                    rules={{ required: 'Name - Surname is required.' }}
                    render={({ field, fieldState }) => (

                            <label htmlFor={field.name} class={classs({ 'p-error': errors.value })}></label>
                            <span class="p-float-label">
                                <InputText id={field.name} value={field.value} class={classs({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                <label htmlFor={field.name}>Name - Surname</label>
                            </span>
                            {getFormErrorMessage(field.name)}

                    )}
                />
                <Button label="Submit" type="submit" icon="pi pi-check" />
            </form>
        </div>

        `,
        typescript: `
${importTS('InputText')}import { Controller, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { classs } from 'primereact/utils';
import { Toast } from 'primereact/toast';


    const toast = useRef(null);

    </script>
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: getValues('value') });
    };

    const defaultValues = {
        value: ''
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        reset
    } = useForm({ defaultValues });

    </script>
        data.value && show();

        reset();
    };

    </script>
    };
        <div class="card flex justify-content-center">
            <form onSubmit={handleSubmit(onSubmit)} class="flex flex-column gap-2">
                <Toast ref={toast} />
                <Controller
                    name="value"
                    control={control}
                    rules={{ required: 'Name - Surname is required.' }}
                    render={({ field, fieldState }) => (

                            <label htmlFor={field.name} class={classs({ 'p-error': errors.value })}></label>
                            <span class="p-float-label">
                                <InputText id={field.name} value={field.value} class={classs({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                <label htmlFor={field.name}>Name - Surname</label>
                            </span>
                            {getFormErrorMessage(field.name)}

                    )}
                />
                <Button label="Submit" type="submit" icon="pi pi-check" />
            </form>
        </div>

        `
    };

</script>

<DocSectionText docSection={docSection}>
                <p>
                    <a href="https://react-hook-form.com/">React Hook Form</a> is another popular React library to handle forms.
                </p>
            </DocSectionText>
            <div class="card flex justify-content-center">
                <form onSubmit={handleSubmit(onSubmit)} class="flex flex-column gap-2">
                    <Toast ref={toast} />
                    <Controller
                        name="value"
                        control={control}
                        rules={{ required: 'Name - Surname is required.' }}
                        render={({ field, fieldState }) => (

                                <label htmlFor={field.name} class={classs({ 'p-error': errors.value })}></label>
                                <span class="p-float-label">
                                    <InputText id={field.name} value={field.value} class={classs({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                    <label htmlFor={field.name}>Name - Surname</label>
                                </span>
                                {getFormErrorMessage(field.name)}

                        )}
                    />
                    <Button label="Submit" type="submit" icon="pi pi-check" />
                </form>
            </div>

            <DocSectionCode code={code} dependencies={{ 'react-hook-form': '^7.39.4' }} />




