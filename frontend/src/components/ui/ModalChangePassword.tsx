import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
  ModalHeader,
} from "@chakra-ui/react";
import { Field, FieldProps, Form, Formik } from "formik";
import React from "react";
import bulletDog from "../../img/bulletdog.png";
import useUsers from "../../hooks/useUsers";

function ModalChangePassword() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef<HTMLInputElement>(null);
  const finalRef = React.useRef<HTMLInputElement>(null);
  const { changePassword } = useUsers();

  function validatePassMatch(pass: string, value: string) {
    let error = "";
    if (!value) {
      error = "Confirm password field is required";
    } else if (pass !== value) {
      error = "Password does not match";
    }

    // error = "Password is required";
    return error;
  }

  const validatePass = (value: string) => {
    let error = "";
    if (!value) {
      error = "New password field is required";
    }
    return error;
  };

  return (
    <div>
      <Button colorScheme="gray" onClick={onOpen} w="150px">
        Change Password
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />

        <ModalContent>
          <Flex direction="column" alignItems="center" mt="30px">
            <Flex bgImage={bulletDog} w="50px" h="40px" bgSize="100%"></Flex>
            <ModalHeader display="flex" w="100%" justifyContent="center">
              Change Your Password
            </ModalHeader>
          </Flex>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Formik
              initialValues={{
                oldPassword: "",
                newPassword: "",
                reNewPassword: "",
              }}
              onSubmit={(values, actions) => {
                changePassword(
                  values,

                  onClose
                );
                actions.setSubmitting(false);
              }}
            >
              {(props) => (
                <Form>
                  <Field name="oldPassword">
                    {({ field, form, meta }: FieldProps) => (
                      <FormControl
                        isInvalid={Boolean(meta.error) && meta.touched}
                      >
                        <FormLabel htmlFor="oldPassword">
                          Old Password
                        </FormLabel>
                        <Input
                          type="password"
                          {...field}
                          onInput={() => {
                            props.setStatus(false);
                          }}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.oldPassword}
                          placeholder="Enter your current password"
                        />
                        <FormErrorMessage>
                          {props.errors.oldPassword}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="newPassword" validate={validatePass}>
                    {({ field, form, meta }: FieldProps) => (
                      <FormControl
                        isInvalid={Boolean(meta.error) && meta.touched}
                      >
                        <FormLabel htmlFor="newPassword">
                          New Password
                        </FormLabel>
                        <Input
                          {...field}
                          type="password"
                          onInput={() => {
                            props.setStatus(false);
                          }}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.newPassword}
                          placeholder="Enter new password"
                        />
                        <FormErrorMessage>
                          {props.errors.newPassword}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field
                    name="reNewPassword"
                    validate={(value: string) =>
                      validatePassMatch(props.values.newPassword, value)
                    }
                  >
                    {({ field, form, meta }: FieldProps) => (
                      <FormControl
                        isInvalid={Boolean(meta.error) && meta.touched}
                      >
                        <FormLabel htmlFor="reNewPassword">
                          Re-enter new password
                        </FormLabel>
                        <Input
                          {...field}
                          type="password"
                          onInput={() => {
                            props.setStatus(false);
                          }}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.reNewPassword}
                          placeholder="Enter your new password again"
                        />
                        <FormErrorMessage>
                          {props.errors.reNewPassword}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  {!!props.status && (
                    <Text textAlign="center" color="red">
                      {props.status}
                    </Text>
                  )}
                  <Flex
                    id="formButtons"
                    h="50px"
                    w="100%"
                    mt="20px"
                    alignItems="center"
                    justifyContent="space-around"
                  >
                    {/* <Button onClick={onClose}>Cancel</Button> */}
                    <Button onClick={onClose}>Cancel</Button>
                    <Button
                      // mt={4}
                      colorScheme="blue"
                      isLoading={props.isSubmitting}
                      type="submit"
                      // onClick={() => handleLogin(props)}
                    >
                      Submit
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme="cyan" color="white" mr={3}>
                Login
              </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ModalChangePassword;
