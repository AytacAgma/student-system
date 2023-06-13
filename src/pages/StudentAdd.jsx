import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
//import MaskedInput from 'react-text-mask'
import { Button, FormField, Label } from 'semantic-ui-react'
import StudentService from '../services/studentService'
import { toast } from 'react-toastify';
import CityService from '../services/cityService'
import TownService from '../services/townService'

export default function StudentAdd() {

    const initialValues = { nationalId: "", name: "", telephone: "", town: "" }

    const schema = Yup.object({
        nationalId: Yup.string().min(11, 'TC Kimlik Numarası 11 Haneli Olmalıdır.').max(11, 'TC Kimlik Numarası 11 Haneli Olmalıdır.').required("TC Kimlik Numarası Girilmesi Zorunludur."),
        name: Yup.string().required("İsim Girilmesi Zorunludur."),
        telephone: Yup.string().min(10, 'Telefon Numarası 11 Haneli Olmalıdır.').max(10, 'Telefon Numarası 11 Haneli Olmalıdır.')
    })

    //const phoneNumberMask = ["(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];

    const [citys, setCitys] = useState([])

    const [towns, setTowns] = useState([])

    //const [maskedTel, setmaskedTel] = useState([])

    useEffect(() => {
        let cityService = new CityService()
        cityService.getCitys().then(result => setCitys(result.data))
    }, [])

    function handleTown(cityId) {
        debugger
        let townService = new TownService()
        townService.getTowns(cityId).then(result => setTowns(result.data))
    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={(values) => {
                    let studentService = new StudentService()
                    console.log(values)
                    debugger
                    studentService.addStudent(values.nationalId, values.name, values.telephone, values.town)
                        .then(toast.success(`Öğrenci ${values.name} Eklendi`))
                }}
            >
                <Form className='ui form'>
                    <FormField>
                        <Field name='nationalId' placeholder='TC Kimlik No' type="number"></Field>
                        <ErrorMessage name='nationalId' render={error =>
                            <Label pointing basic color='red' content={error}></Label>
                        }></ErrorMessage>
                    </FormField>
                    <FormField>
                        <Field name='name' placeholder='İsim'></Field>
                        <ErrorMessage name='name' render={error =>
                            <Label pointing basic color='red' content={error}></Label>
                        }></ErrorMessage>
                    </FormField>
                    <FormField>
                        <Field name='telephone' placeholder='Telefon' type="number"></Field>
                        <ErrorMessage name='telephone' render={error =>
                            <Label pointing basic color='red' content={error}></Label>
                        }></ErrorMessage>
                    </FormField>
                    <FormField>
                        <Field as="select" name="city" placeholder='Şehir' onChange={(e) => handleTown(e.target.value)}>
                            <option value="1">Şehir Seçiniz</option>
                            {
                                citys.map(city => <option key={city.id} value={city.id}>{city.cityName}</option>)
                            }
                        </Field>
                    </FormField>
                    <FormField>
                        <Field as="select" name="town" placeholder='İlçe'>
                            <option value="">İlçe Seçiniz</option>
                            {
                                towns.map(town => <option key={town.id} value={town.id}>{town.townName}</option>)
                            }
                        </Field>
                    </FormField>
                    <Button color='green' type='submit'>Ekle</Button>
                </Form>
            </Formik>
        </div>
    )
}
