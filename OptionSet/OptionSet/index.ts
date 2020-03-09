import {IInputs, IOutputs} from "./generated/ManifestTypes";
import * as React from 'react';
import * as ReactDOM from "react-dom";
import {DefaultButton, IButton} from 'office-ui-fabric-react/lib/Button';
import { Button, ButtonList, IButtonListProps } from './OptionSet';
import { isBoolean } from "util";

export class OptionSet implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _checked: number | undefined;
	private notifyOutputChanged: () => void;
	private _container: HTMLDivElement;
	
	constructor()
	{
	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context Contains all the information about how the component is configured and all the parameters that can be used within the component along with the Power Apps component framework APIs.
	 * @param notifyOutputChanged Alerts the framework whenever the code component has new outputs ready to be retrieved asynchronously.
	 * @param state Contains component data from the previous page load in the current session if the component explicitly stored it earlier using the setControlState method.
	 * @param container An HTML div element to which developers and app makers can append the HTML elements for the UI that defines the component. If a control is marked control-type='standard', it will receive an empty div element within which it can render its content. 
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
		{
		this.notifyOutputChanged = notifyOutputChanged;
		this._container = container;
		}
		
		notifyChange(selected: number|undefined) 
		{
		this._checked = selected;
		this.notifyOutputChanged();
		}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{	
		// If the form is disabled because it is inactive or the user doesn't have access
		// isControlDisabled is set to true
		// let isReadOnly = context.mode.isControlDisabled;

		// this._checked = context.parameters.optionset.raw || undefined;

		//return the options (label and values) from within the optionset
		let options:ComponentFramework.PropertyHelper.OptionMetadata[] = context.parameters.optionset.attributes!.Options;

		//adds the options to the list
		let props: IButtonListProps = 
		{
			list: options
		}

		// Control the rendering of contents to the specificed container.
		// In this example the Button List class component, which is implemented 
		// in the OptionSet.tsx file.
		ReactDOM.render(
		React.createElement(ButtonList, props),
		this._container);
	}



	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return{optionset: this._checked};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}


	private submitClicked(evnt: Event): void 
	{
		this.notifyOutputChanged();
	}

}