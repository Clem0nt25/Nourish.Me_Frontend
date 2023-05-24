import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import editLogo from "../assets/edit-pen.png";
import NameForm from "../components/forms/NameForm";
import BaseInfoForm from "../components/forms/BaseInfoForm";
import GoalForm from "../components/forms/GoalForm";
import WeightForm from "../components/forms/WeightForm";
import ActivityLevelForm from "../components/forms/ActivityLevelForm";
import caculateUserSpecs from "../components/forms/caculateUserSpecs";

function Profile() {
	const { logout, currUserSt } = useContext(SessionContext);
	const navigate = useNavigate();
	const [isOpenModalSt, setIsOpenModalSt] = useState({
		goalModal: false,
		activityLevelModal: false,
		baseInfoMoadl: false,
		weightModal: false,
	});

	const [userSpecsSt, setUserSpecsSt] = useState();
	const [inputSt, setInputSt] = useState({});
	const [ifSpecsUpdatedSt, setIfSpecsUpdatedSt] = useState(true);

	const handleInput = (e) => {
		setInputSt({ ...inputSt, [e.target.name]: e.target.value });
	};

	const findUserSpecsAndSet = async () => {
		const response = await fetch(
			`${import.meta.env.VITE_BASE_API_URL}/api/checkUserSpecs/${
				currUserSt._id
			}`
		);
		if (response.status === 200) {
			const { data: userSpecs } = await response.json();
			const currSpecs = {
				username: userSpecs.username,
				mainGoal: userSpecs.mainGoal,
				activityLevel: userSpecs.activityLevel,
				gender: userSpecs.gender,
				yearOfBirth: userSpecs.yearOfBirth,
				height: userSpecs.height,
				currentWeight: userSpecs.currentWeight,
				weightChangePerWeek: userSpecs.weightChangePerWeek,
			};

			const goalWeightChange = Math.abs(
				userSpecs.goalWeight - userSpecs.currentWeight
			);
			setInputSt({
				...currSpecs,
				goalWeightChange,
			});
			setUserSpecsSt({
				...currSpecs,
				goalWeight: userSpecs.goalWeight,
				goalWeightChange,
			});
			//finish user specs fetch
			setIfSpecsUpdatedSt(false);
		} else if (response.status === 404) {
			navigate("/progress-questionnaire");
		}
	};

	useEffect(() => {
		if (ifSpecsUpdatedSt && currUserSt) {
			findUserSpecsAndSet();
		}
	}, [currUserSt, ifSpecsUpdatedSt]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		//check if there is any empty input fields
		let countEmpty = 0;
		for (const key in inputSt) {
			if (key !== "goalWeightChange") {
				if (!inputSt[key]) countEmpty += 1;
			}
		}
		//if no empty input fields, can submit
		if (countEmpty === 0) {
			//last step modify the user specs
			const inputModified = { ...inputSt };
			//from need weight change to no need
			if (
				userSpecsSt.mainGoal !== "recompose" &&
				userSpecsSt.mainGoal !== "keep-shape" &&
				(inputSt.mainGoal === "recompose" || inputSt.mainGoal === "keep-shape")
			) {
				inputModified.weightChangePerWeek = "skip";
				inputModified.goalWeightChange = 0;
			}
			//from no need weight change to need
			else if (
				(userSpecsSt.mainGoal === "recompose" ||
					userSpecsSt.mainGoal === "keep-shape") &&
				inputSt.mainGoal !== "recompose" &&
				inputSt.mainGoal !== "keep-shape"
			) {
				inputModified.weightChangePerWeek = "0.25kg";
			}

			//caculate user specs
			const payload = caculateUserSpecs(inputModified, currUserSt._id);

			console.log("Payload!", payload);

			//talk to api
			try {
				const response = await fetch(
					`${import.meta.env.VITE_BASE_API_URL}/api/updateUserSpecsCurrent/${
						currUserSt._id
					}`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(payload),
					}
				);
				if (response.status === 200) {
					//set ifSpecsUpdatedSt to true to get back user specs again from database
					setIfSpecsUpdatedSt(true);
					//close the modals
					const newOpenModals = { ...isOpenModalSt };
					for (const key in newOpenModals) {
						newOpenModals[key] = false;
					}
					setIsOpenModalSt(newOpenModals);
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		userSpecsSt && (
			<div className="profile-page">
				<h3>{userSpecsSt.username} :)</h3>
				<div className="profile-specs-contatiner">
					<div>
						<div className="spec-titles">
							<h6>-Basic informaton-</h6>
						</div>
						<div className="specs-content">
							<p>Gender</p>
							<h4>
								{userSpecsSt.gender[0].toUpperCase() +
									userSpecsSt.gender.slice(1)}
							</h4>
							<div className="specs-content-gap"></div>
							<p>Year of birth</p>
							<h4>{userSpecsSt.yearOfBirth}</h4>
							<div className="specs-content-gap"></div>
							<p>Height</p>
							<h4>{userSpecsSt.height}cm</h4>
						</div>
					</div>
					<button
						onClick={() => {
							setIsOpenModalSt({ ...isOpenModalSt, baseInfoModal: true });
						}}
					>
						<img src={editLogo} alt="edit" width={20} />
					</button>
				</div>
				<div className="profile-specs-contatiner">
					<div>
						<div className="spec-titles">
							<h6>-Your diet goal-</h6>
						</div>
						<div className="specs-content">
							<p>You now aim to</p>
							<h4>
								{userSpecsSt.mainGoal
									.split("-")
									.map((word) => {
										return word[0].toUpperCase() + word.slice(1);
									})
									.join(" ")}
							</h4>
						</div>
					</div>
					<button
						onClick={() => {
							setIsOpenModalSt({ ...isOpenModalSt, goalModal: true });
						}}
					>
						<img src={editLogo} alt="edit" width={20} />
					</button>
				</div>
				<div className="profile-specs-contatiner">
					<div>
						<div className="spec-titles">
							<h6>-Your weight information-</h6>
						</div>
						<div className="specs-content">
							<p>Current weight</p>
							<h4>{userSpecsSt.currentWeight}kg</h4>
							{!(
								userSpecsSt.mainGoal === "recompose" ||
								userSpecsSt.mainGoal === "keep-shape"
							) && (
								<>
									<div className="specs-content-gap"></div>
									<p>Goal weight</p>
									<h4>
										{userSpecsSt.currentWeight +
											(userSpecsSt.mainGoal === "get-lean"
												? -inputSt.goalWeightChange
												: inputSt.goalWeightChange)}
										kg
									</h4>
									<div className="specs-content-gap"></div>
									<p>Aimed weight change</p>
									<h4>{userSpecsSt.weightChangePerWeek} per week</h4>
								</>
							)}
						</div>
					</div>
					<button
						onClick={() => {
							setIsOpenModalSt({ ...isOpenModalSt, weightModal: true });
						}}
					>
						<img src={editLogo} alt="edit" width={20} />
					</button>
				</div>
				<div className="profile-specs-contatiner">
					<div>
						<div className="spec-titles">
							<h6>-Your activity level-</h6>
						</div>
						<div className="specs-content">
							<p>Daily life and work-out intensity</p>
							<h4>
								{userSpecsSt.activityLevel[0].toUpperCase() +
									userSpecsSt.activityLevel.slice(1)}
							</h4>
						</div>
					</div>
					<button
						onClick={() => {
							setIsOpenModalSt({ ...isOpenModalSt, activityLevelModal: true });
						}}
					>
						<img src={editLogo} alt="edit" width={20} />
					</button>
				</div>
				<div className="profile-btn-contatiner">
					<button className="profile-logout-btn" onClick={logout}>
						Log out
					</button>
				</div>
				{/* 4 Modals --------------------------------------------------- */}
				{/* Base Info Modal --------------------------------------------------- */}
				<Modal
					closeOnOverlayClick={false}
					isOpen={isOpenModalSt.baseInfoModal}
					onClose={isOpenModalSt.baseInfoModal}
					isCentered
					size="sm"
				>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Edit your base info</ModalHeader>
						<ModalBody pb={6}>
							<NameForm inputSt={inputSt} handleInput={handleInput} inEdit />
							<BaseInfoForm inputSt={inputSt} handleInput={handleInput} />
						</ModalBody>

						<ModalFooter>
							<Button
								colorScheme="green"
								mr={3}
								onClick={(e) => {
									handleSubmit(e);
								}}
							>
								Save Change
							</Button>
							<Button
								onClick={() => {
									setIsOpenModalSt({
										...isOpenModalSt,
										baseInfoModal: false,
									});
									setInputSt(userSpecsSt);
								}}
							>
								Cancel
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
				{/* Main Goal Modal --------------------------------------------------- */}
				<Modal
					closeOnOverlayClick={false}
					isOpen={isOpenModalSt.goalModal}
					onClose={isOpenModalSt.goalModal}
					isCentered
					size="sm"
				>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Edit your diet goal</ModalHeader>
						<ModalBody pb={6}>
							<GoalForm inputSt={inputSt} handleInput={handleInput} inEdit />
						</ModalBody>

						<ModalFooter>
							<Button
								colorScheme="green"
								mr={3}
								onClick={(e) => {
									handleSubmit(e);
								}}
							>
								Save Change
							</Button>
							<Button
								onClick={() => {
									setIsOpenModalSt({ ...isOpenModalSt, goalModal: false });
									setInputSt(userSpecsSt);
								}}
							>
								Cancel
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
				{/* Weight Modal --------------------------------------------------- */}
				<Modal
					closeOnOverlayClick={false}
					isOpen={isOpenModalSt.weightModal}
					onClose={isOpenModalSt.weightModal}
					isCentered
					size="sm"
				>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Edit your current weight and goal weight</ModalHeader>
						<ModalBody pb={6}>
							<WeightForm inputSt={inputSt} handleInput={handleInput} inEdit />
						</ModalBody>

						<ModalFooter>
							<Button
								colorScheme="green"
								mr={3}
								onClick={(e) => {
									handleSubmit(e);
								}}
							>
								Save Change
							</Button>
							<Button
								onClick={() => {
									setIsOpenModalSt({ ...isOpenModalSt, weightModal: false });
									setInputSt(userSpecsSt);
								}}
							>
								Cancel
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
				{/* Activity LevelModal Modal --------------------------------------------------- */}
				<Modal
					closeOnOverlayClick={false}
					isOpen={isOpenModalSt.activityLevelModal}
					onClose={isOpenModalSt.activityLevelModal}
					isCentered
					size="sm"
				>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Edit your current weight and goal weight</ModalHeader>
						<ModalBody pb={6}>
							<ActivityLevelForm
								inputSt={inputSt}
								handleInput={handleInput}
								inEdit
							/>
						</ModalBody>

						<ModalFooter>
							<Button
								colorScheme="green"
								mr={3}
								onClick={(e) => {
									handleSubmit(e);
								}}
							>
								Save Change
							</Button>
							<Button
								onClick={() => {
									setIsOpenModalSt({
										...isOpenModalSt,
										activityLevelModal: false,
									});
									setInputSt(userSpecsSt);
								}}
							>
								Cancel
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
				{/* --------------------------------------------------- */}
			</div>
		)
	);
}

export default Profile;
