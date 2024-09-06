import { Template } from "mailing-core";
import {
    Mjml,
    MjmlBody,
    MjmlSection,
    MjmlColumn,
    MjmlText,
    MjmlSpacer,
    MjmlHead,
    MjmlPreview,
} from "@faire/mjml-react";
import { fontSize, spacing } from "./theme";

export type InboundContactPropType = {
    contactee: string;
    textContent: string;
    retAddress: string;
};

const InboundContact: Template<InboundContactPropType> = (props) => {
    return (
        <Mjml>
            <MjmlHead>
                <MjmlPreview>
                    {`${props.contactee} wants to contact you!`}
                </MjmlPreview>
            </MjmlHead>
            <MjmlBody>
                <MjmlSection>
                    <MjmlColumn>
                        <MjmlText fontSize={fontSize.xl}>
                            {`Contact from ${props.contactee}`}
                        </MjmlText>
                        <MjmlSpacer height={spacing.s3} />
                        <MjmlText>{props.textContent}</MjmlText>
                        <MjmlSpacer height={spacing.s3} />
                        <MjmlText>
                            {`The return email address is: ${props.retAddress}`}
                        </MjmlText>
                    </MjmlColumn>
                </MjmlSection>
            </MjmlBody>
        </Mjml>
    );
};

InboundContact.subject = (props) => `${props.contactee} wants to contact you!`;
export default InboundContact;
