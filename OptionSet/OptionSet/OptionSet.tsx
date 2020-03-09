import * as React from 'react';
import { DefaultButton, IButtonProps, Stack} from 'office-ui-fabric-react';
import { useState, useEffect } from "react";


/**
 * Simple alert 
 * TODO implement onclick action for Button component.
 */
function _alertClicked(): void {
  alert('Clicked');
}

/**
 * Constant Button defines a component of type button that abstracts the implementation of Office UI Fabric DefaultButton.
 * @param {IButtonProps} props - properties object argument 
 */
export const Button: React.FunctionComponent<IButtonProps> = (props: IButtonProps) => {
  return (
    <DefaultButton text={props.text} onClick={_alertClicked} allowDisabledFocus/>
    );
};

//creates an array for the list of options and is exported to index.ts
export type IButtonListProps = {
  list: Array<any>
}

/**
 * ButtonList component generates a collection of buttons based from an array passed in matching the IButtonListProps implementation.
 * @property {IButtonListProps} props - properties object argument
 */
export const ButtonList: React.ComponentClass<IButtonListProps> = class ButtonList extends React.Component<IButtonListProps> {

  render() {
      //For each element of the list collection return a new button component with the elements label property as the button text
    let elementCollection = this.props.list.map((element: any) => {
      return (
        <Button text={element.Label}/>
      )
    })

    // Return the collection in an Office UI Fabric Stack component.
    return (
      <React.Fragment>
        <Stack horizontal>
        {elementCollection}
      </Stack>
    </React.Fragment >
  )
}
}