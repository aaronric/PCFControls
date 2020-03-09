import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { isNull, isNullOrUndefined } from "util";

export class PulsingNotification implements ComponentFramework.StandardControl<IInputs, IOutputs> {


	// value of our field is stored to this variable
	private _value: string;

	// PCF framework to notify of changes
	private _notifyOutputChanged: () => void;

	// Define Standard container element
	private _container: HTMLDivElement;


	// Define Display Elements
	private _boxDiv: HTMLDivElement;
	private _boxInnerDiv: HTMLDivElement;
	private _textAnchor: HTMLAnchorElement;



	// Event handler 'refreshData' reference
	private _refreshData: EventListenerOrEventListenerObject;

	/**
	 * Empty constructor.
	 */
	constructor() {

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='starndard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {

		// define standard control elements		
		this._container = document.createElement("div");

		// define the control elements
		this._boxDiv = document.createElement("div");
		this._boxDiv.setAttribute("class", "box");

		this._boxInnerDiv = document.createElement("div");
		this._boxInnerDiv.setAttribute("class", "animated pulse");

		this._textAnchor = document.createElement("a");
		//this._textAnchor.setAttribute("href", "#"); // right now this does not link to anywhere, future version it may
		//this._textAnchor.setAttribute("target", "_blank"); // right now this does not link to anywhere, future version it may
		//this._textAnchor.innerHTML = "THIS IS A DEBUG TEST!"

		// inception stuff going on
		this._boxDiv.appendChild(this._boxInnerDiv);
		this._boxInnerDiv.appendChild(this._textAnchor);



		// add control elements to the div
		this._container.appendChild(this._boxDiv);
		container.appendChild(this._container);

		// this._notifyOutputChanged = notifyOutputChanged;




	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void {
		// Add code to update control view

		this._value = context.parameters.notificationMessage.raw||"";

		if (this._value == "" || isNullOrUndefined(this._value)) {
			console.log("No value");
			this._boxDiv.setAttribute("style", "visibility:hidden;");
		} else {
			this._boxDiv.setAttribute("style", "visibility:visible;");
			this._textAnchor.innerHTML = this._value;
		}


	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs {
		return {
			notificationMessage: this._value
		};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void {
		// Add code to cleanup control if necessary
	}
}